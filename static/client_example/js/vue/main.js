import store from './store/index.js'
import routes from './routes.js'

export let comments = {}
const divRoot = document.getElementById('comments');
if (divRoot) {
	comments = new Vue({
		el: '#comments',
		router: new VueRouter({ routes }),
		vuetify: new Vuetify(),
		store,
		data() {
			return {
				Buildnr: "",
				links: routes,
				drawer: false,
				connection: null,
			}
		},
		computed: {
			...Vuex.mapState({

			})
		},
		created() {

			const postId = divRoot.getAttribute('data-postid');
			const disablepost = divRoot.getAttribute('data-diablepost');
			console.log('Comments for the post id', postId, disablepost)
			this.$store.commit('setPostProp', { id: postId, disablePosting: disablepost })
			console.log('Main for comments is here!')
		},
		methods: {

		},
		template: `
  <v-app>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
`
	})

}else{
	console.log('No comments at all enabled for this post')
}

