
export default {
    state: {
        post_id: 42,
        posting_is_disabled: false,
        tot_comments: 3,
        comments: [
            { content: 'This is a blog comment 1', num_of_children: 0, user: 'Gianni', avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', post_id: 42, parent_id: 0, id: 20 },
            {
                content: 'This is a blog comment 2', num_of_children: 2, children_caption: '2 risposte', user: 'Luzzo', avatar: 'https://www.gravatar.com/avatar/233330b479e2e5b48aec07710c08d50/?d=mp', post_id: 42, parent_id: 0, id: 19,
                children: [
                    { content: 'This is a Reply blog comment 1-2', user: 'Bruno', post_id: 42, parent_id: 19, id: 21 },
                    { content: 'This is another Reply blog comment 1-3', user: 'Mario', avatar: 'https://www.gravatar.com/avatar/233330b479e2e5b48aec07710c08d50/?d=mp', post_id: 42, parent_id: 19, id: 22 },
                ]
            },
            { content: 'Commento finale prima di finire', num_of_children: 0, user: 'Luzzo', avatar: 'https://www.gravatar.com/avatar/233330b479e2e5b48aec07710c08d50/?d=mp', post_id: 42, parent_id: 0, id: 23, }
        ],
    },
    mutations: {
        setPostProp(state, val) {
            console.log('Set the post properties', val)
            if(!val){
              return
            }
            state.post_id = val.id 
            state.posting_is_disabled = val.disablePosting
        }
    }
}