import React, { createContext, useReducer } from 'react';
import { PostReducer } from '../reducers/PostReducer';


export const PostContext = createContext();

const PostContextProvider = (props) => {

    const initialState = {
        posts: [],
        before: null
    }

    const [postContextState, dispatch] = useReducer(PostReducer, initialState);
    return (
        <PostContext.Provider value={{postContextState, dispatch}}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;