
export default {
    state: {
        post_id: 42,
        tot_comments: 1,
        comments: [
            { content: 'This is a blog comment 1', user: 'Gianni', avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', post_id: 42, parent_id: 0, id: 20 },
            {
                content: 'This is a blog comment 2', has_children: true, num_of_children: 2, user: 'Luzzo', avatar: 'https://www.gravatar.com/avatar/233330b479e2e5b48aec07710c08d50/?d=mp', post_id: 42, parent_id: 0, id: 19,
                children: [
                    { content: 'This is a Reply blog comment 1-2', user: 'Bruno', post_id: 42, parent_id: 20, id: 21 },
                    { content: 'This is another Reply blog comment 1-3', user: 'Mario', post_id: 42, parent_id: 20, id: 21 },
                ]
            }
        ],
    },
    mutations: {
        setPostId(state, id) {
            console.log('Set the post id to', id)
            state.post_id = id
        }
    }
}