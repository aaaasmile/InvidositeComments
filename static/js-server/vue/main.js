import store from './store/index.js'
import routes from './routes.js'


export const app = new Vue({
	el: '#app',
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