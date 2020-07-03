export const POST_ACTIONS = {
    SET_POST: 'SET_POST',
    SET_LAST_DATE: 'SET_LAST_DATE',
    FLUSH_POSTS: 'FLUSH_POSTS'
}

export const PostReducer = (state, action) => {
    switch (action.type) {
        case POST_ACTIONS.SET_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload.post]
            };
            break;
        case POST_ACTIONS.SET_LAST_DATE: 
            return {
                ...state,
                before: action.payload.before
            };
            break;
        case POST_ACTIONS.FLUSH_POSTS: 
            return {
                ...state,
                posts: []
            }
        default:
            return state;
    }
};
