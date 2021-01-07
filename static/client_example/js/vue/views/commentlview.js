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
    <v-card-title>{{NumComment}} {{TitleCommenti}}</v-card-title>
    <v-container>
      <v-list two-line>
        <v-list-item v-for="item in Comments" :key="item.id">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content> 
            <v-list-item-title v-html="item.user"></v-list-item-title>
            <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
`
}