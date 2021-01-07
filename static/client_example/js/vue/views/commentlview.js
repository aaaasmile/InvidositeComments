import API from '../apicaller.js'

export default {
  data() {
    return {
      loading: false,
      new_comment: '',
      user_name: '',
      email: '',
      dialogSubmit: false,
    }
  },
  computed: {
    ...Vuex.mapState({
      Comments: state => {
        return state.cs.comments
      },
      NumComment: state => {
        return state.cs.tot_comments
      },
      TitleCommenti: state => {
        if (state.cs.tot_comments === 1){
          return "Commento"
        }
        return "Commenti"
      },
      PostingIsDisabled: state => {
        return state.cs.posting_is_disabled
      }
    })
  },
  methods: {
    addComment(){
      console.log('add comment')
    },
    enterOnFocus(){
      console.log('Textfield enter on focus')
      this.dialogSubmit = true
    }
  },
  template: `
  <v-card class="mx-auto">
    <v-card-title>{{ NumComment }} {{ TitleCommenti }}</v-card-title>
    <v-container>
      <v-text-field
        v-model="new_comment"
        :disabled="PostingIsDisabled"
        label="Commenta pubblicamente"
        @focus.enter="enterOnFocus"
      ></v-text-field>

      <v-card flat v-if="dialogSubmit">
        <v-container>
          <v-row justify="space-around">
            <v-text-field label="Utente*" v-model="user_name"></v-text-field>
            <v-text-field label="Email*" v-model="email"></v-text-field>
          </v-row>
          <v-row justify="space-around">
            Il codice html non è ammesso e il commento è soggetto a moderazione.
            I campi Email e Utente sono obbligatori. La Email viene usata per il
            logo (gravatar). L'Utente per indentificare il commento. I dati non
            vengono ceduti in nessun modo a terzi. Mai. Altrimenti tenevo il mio
            account su facebook, che facevo molto prima. Vedi
            <a
              href="https://github.com/aaaasmile/InvidositeComments"
              target="_blank"
              >sorgenti su github</a
            >
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialogSubmit = false"
            >Annulla</v-btn
          >
          <v-btn color="grey lighten-3" depressed @click="addComment"
            >Commenta</v-btn
          >
        </v-card-actions>
      </v-card>

      <v-list two-line>
        <template v-for="item in Comments">
          <v-list-item :key="item.id">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.user"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.content"
              ></v-list-item-subtitle>
              <v-expansion-panels v-if="item.num_of_children > 0" :flat="true">
                <v-expansion-panel>
                  <v-expansion-panel-header>{{
                    item.children_caption
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <template v-for="childitem in item.children">
                      <v-list-item :key="childitem.id">
                        <v-list-item-avatar>
                          <v-img :src="childitem.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="childitem.user"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-html="childitem.content"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-card>
`
}