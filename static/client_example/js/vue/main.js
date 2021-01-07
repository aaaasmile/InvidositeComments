import store from './store/index.js'
import routes from './routes.js'


export const comments = new Vue({
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
		const div1 = document.getElementById('comments');
		const postId = div1.getAttribute('data-postid');
		const disablepost = div1.getAttribute('data-diablepost');
		console.log('Comments for the post id', postId, disablepost)
		this.$store.commit('setPostProp', {id: postId, disablePosting: disablepost})
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

console.log('Main for comments is here!')