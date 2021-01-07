import API from '../apicaller.js'

export default {
  data() {
    return {
      loading: false,
    
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
    })
  },
  methods: {
    addComment(){
      console.log('add comment')
    },
  },
  template: `
  <v-card class="mx-auto">
    <v-card-title>{{ NumComment }} {{ TitleCommenti }}</v-card-title>
    <v-container>
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
  </v-card>`
}