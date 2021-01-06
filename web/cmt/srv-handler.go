package cmt

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/aaaasmile/InvidositeComments/conf"
	"github.com/aaaasmile/InvidositeComments/db"
	"github.com/aaaasmile/InvidositeComments/web/idl"
)

var (
	g_liteDB *db.LiteDB
)

type PageCtx struct {
	RootUrl    string
	Buildnr    string
	VueLibName string
	StreamURL  string
}

func getURLForRoute(uri string) string {
	arr := strings.Split(uri, "/")
	//fmt.Println("split: ", arr, len(arr))
	for i := len(arr) - 1; i >= 0; i-- {
		ss := arr[i]
		if ss != "" {
			if !strings.HasPrefix(ss, "?") {
				//fmt.Printf("Url for route is %s\n", ss)
				return ss
			}
		}
	}
	return uri
}

func APiHandler(w http.ResponseWriter, req *http.Request) {
	start := time.Now()
	log.Println("Request: ", req.RequestURI)
	var err error
	switch req.Method {
	case "GET":
		err = handleGet(w, req)
	case "POST":
		log.Println("POST on ", req.RequestURI)
		err = handlePost(w, req)
	}
	if err != nil {
		log.Println("Error exec: ", err)
		http.Error(w, fmt.Sprintf("Internal error on execute: %v", err), http.StatusInternalServerError)
	}

	t := time.Now()
	elapsed := t.Sub(start)
	log.Printf("Service %s total call duration: %v\n", idl.Appname, elapsed)
}

func handleGet(w http.ResponseWriter, req *http.Request) error {
	u, _ := url.Parse(req.RequestURI)
	log.Println("GET requested ", u)

	pagectx := PageCtx{
		RootUrl:    conf.Current.RootURLPattern,
		Buildnr:    idl.Buildnr,
		VueLibName: conf.Current.VueLibName,
	}
	templName := "templates/index.html"

	tmplIndex := template.Must(template.New("AppIndex").ParseFiles(templName))

	err := tmplIndex.ExecuteTemplate(w, "base", pagectx)
	if err != nil {
		return err
	}
	return nil
}

func writeResponse(w http.ResponseWriter, resp interface{}) error {
	blobresp, err := json.Marshal(resp)
	if err != nil {
		return err
	}
	w.Write(blobresp)
	return nil
}

func writeErrorResponse(w http.ResponseWriter, errorcode int, resp interface{}) error {
	blobresp, err := json.Marshal(resp)
	if err != nil {
		return err
	}
	http.Error(w, string(blobresp), errorcode)
	return nil
}

func InitFromConfig(debug bool, dbPath string) error {
	if g_liteDB.IsRunning() {
		log.Println("Db already initialized")
		return nil
	}
	g_liteDB.DebugSQL = debug
	g_liteDB.SqliteDBPath = dbPath
	if err := g_liteDB.OpenSqliteDatabase(); err != nil {
		return err
	}

	go g_liteDB.ListenDbOperations()

	log.Println("DB initialized from configuration", debug, dbPath)
	return nil
}

func HandlerShutdown() {
	chstop := make(chan struct{})
	chTimeout := make(chan struct{})
	timeout := 3 * time.Second
	time.AfterFunc(timeout, func() {
		chTimeout <- struct{}{}
	})
	log.Println("Force off")
	go func(chst1 chan struct{}) {
		g_liteDB.StopListener()
		chst1 <- struct{}{}
	}(chstop)

	count := 1
	select {
	case <-chstop:
		log.Println("End write terminated ok")
		count--
		if count <= 0 {
			log.Println("Shutdown in player ok")
			break
		}
	case <-chTimeout:
		log.Println("Timeout on shutdown, something was blockd")
		break
	}
	log.Println("Exit from HandlerShutdown")
}

func init() {
	g_liteDB = &db.LiteDB{}
}
