import Generic from './generic-store.js'
import CommentStore from './comment-store.js'

export default new Vuex.Store({
  modules: {
    gen: Generic,
    cs: CommentStore,
  }
})
