package cmt

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/aaaasmile/InvidositeComments/db"
)

func handleAddPostComment(w http.ResponseWriter, req *http.Request) error {
	rawbody, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return err
	}

	paraReq := struct {
		Name     string `json:"name"`
		EMail    string `json:"email"`
		Content  string `json:"content"`
		PostID   int    `json:"post_id"`
		ParentID int    `json:"parent_id"`
	}{}
	if err := json.Unmarshal(rawbody, &paraReq); err != nil {
		return err
	}
	log.Println("comment Request", paraReq)
	item := db.CommentItem{
		Name:     paraReq.Name,
		EMail:    paraReq.EMail,
		Content:  paraReq.Content,
		PostID:   paraReq.PostID,
		ParentID: paraReq.ParentID,
	}

	g_liteDB.InsertComment(&item)

	res := struct {
		Status string `json:"status"`
	}{
		Status: "OK",
	}

	return writeResponse(w, res)
}
