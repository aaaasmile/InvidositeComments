package conf

import (
	"fmt"
	"log"
	"os"

	"github.com/BurntSushi/toml"
)

type Config struct {
	ServiceHost     string
	ServicePort     int
	RootURLPattern  string
	UseRelativeRoot bool
	DebugVerbose    bool
	DBPath          string
	VueLibName      string
	ServiceURL      string // calculated
}

var Current = &Config{}

func ReadConfig(configfile string) *Config {
	_, err := os.Stat(configfile)
	if err != nil {
		log.Fatal(err)
	}
	if _, err := toml.DecodeFile(configfile, &Current); err != nil {
		log.Fatal(err)
	}
	Current.ServiceURL = fmt.Sprintf("%s:%d", Current.ServiceHost, Current.ServicePort)

	return Current
}
