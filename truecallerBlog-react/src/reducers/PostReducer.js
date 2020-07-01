export const POST_ACTIONS = {
    SET_POST: 'SET_POST',
}

export const PostReducer = (state, action) => {
    switch (action.type) {
        case POST_ACTIONS.SET_POST:
            return [...state, action.payload];
        default:
            return state;
    }
};
