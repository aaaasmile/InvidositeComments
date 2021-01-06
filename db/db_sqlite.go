package db

import (
	"database/sql"
	"log"
	"os"
	"time"

	"github.com/aaaasmile/InvidositeComments/util"
	_ "github.com/mattn/go-sqlite3"
)

type DbOpType int

const (
	DbOpCommentInsert DbOpType = iota
)

type DbOperation struct {
	DbOpType DbOpType
	Payload  interface{}
}

type LiteDB struct {
	connDb       *sql.DB
	DebugSQL     bool
	SqliteDBPath string
	dbOpCh       chan *DbOperation
	dbStopCh     chan struct{}
	started      bool
}

type CommentItem struct {
	ID                   int
	Name, EMail, Content string
	Timestamp            time.Time
	PostID               int
	ParentID             int
}

func (ld *LiteDB) ListenDbOperations() {
	log.Println("Waiting for db operation item")
	dbCh := make(chan *DbOperation)
	dbStopCh := make(chan struct{})
	ld.dbOpCh = dbCh
	ld.dbStopCh = dbStopCh
	ld.started = true
loop:
	for {
		select {
		case item := <-dbCh:
			proc := false
			log.Println("Db operation rec ", item.DbOpType)
			if item.DbOpType == DbOpCommentInsert {
				if vv, ok := item.Payload.(CommentItem); ok {
					proc = true
					if err := ld.insertCommentItem(&vv); err != nil {
						log.Println("Error on insert comment: ", err)
					}
				}
			}

			if !proc {
				log.Println("Db operation not recognized ", item)
			}
		case <-dbStopCh:
			break loop
		}
	}
	log.Println("Db operation listener terminated")
}

func (ld *LiteDB) StopListener() {
	log.Println("Stop request")
	if ld.started {
		ld.dbStopCh <- struct{}{}
	}
}

func (ld *LiteDB) IsRunning() bool {
	return ld.started
}

func (ld *LiteDB) InsertComment(item *CommentItem) {
	dbop := DbOperation{
		DbOpType: DbOpCommentInsert,
		Payload:  item,
	}
	ld.dbOpCh <- &dbop
}

func (ld *LiteDB) OpenSqliteDatabase() error {
	var err error
	dbname := util.GetFullPath(ld.SqliteDBPath)
	if _, err := os.Stat(dbname); err != nil {
		return err
	}
	log.Println("Using the sqlite file: ", dbname)
	ld.connDb, err = sql.Open("sqlite3", dbname)
	if err != nil {
		return err
	}
	return nil
}

func (ld *LiteDB) insertCommentItem(item *CommentItem) error {
	q := `INSERT INTO comment(post_id,parent_id,name,email,content,timestamp) VALUES(?,?,?,?,?,?,?);`
	if ld.DebugSQL {
		log.Println("Query is", q)
	}

	stmt, err := ld.connDb.Prepare(q)
	if err != nil {
		return err
	}

	now := time.Now()
	sqlres, err := stmt.Exec(item.PostID, item.ParentID, item.Name,
		item.EMail, item.Content, now.Local().Unix())
	if err != nil {
		return err
	}
	log.Println("Comment inserted: ", sqlres)
	return nil
}
