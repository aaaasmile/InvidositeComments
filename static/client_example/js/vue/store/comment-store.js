
export default {
    state: {
        post_id: 0,
        comments: [],
    },
    mutations: {
        setPostId(state, id){
            console.log('Set the post id to', id)
            state.post_id = id
        }
    }
}