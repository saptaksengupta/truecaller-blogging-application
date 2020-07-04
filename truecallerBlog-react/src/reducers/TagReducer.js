export const TAG_ACTIONS = {
    SET_TAG: 'SET_TAG',
    FLUSH_TAGS: 'FLUSH_TAGS'
}

export const TagReducer = (state, action) => {
    switch (action.type) {
        case TAG_ACTIONS.SET_TAG:
            return {
                ...state,
                siteTags: [...state.siteTags, action.payload.siteTag]
            };
            break;
        case TAG_ACTIONS.FLUSH_TAGS: 
            return {
                ...state,
                siteTags: []
            }
        default:
            return state;
    }
};
