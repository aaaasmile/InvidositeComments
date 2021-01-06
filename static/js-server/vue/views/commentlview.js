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
    })
  },
  methods: {
    addComment(){
      console.log('add comment')
    },
  },
  template: `
  <v-row justify="center">
    <v-col xs="12" sm="12" md="10" lg="8" xl="6">
      Comments on Server
    </v-col>
  </v-row>`
}