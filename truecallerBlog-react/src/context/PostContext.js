import React, { createContext, useReducer } from 'react';
import { PostReducer } from '../reducers/PostReducer';


export const PostContext = createContext();

const PostContextProvider = (props) => {
    const [posts, dispatch] = useReducer(PostReducer, []);
    return (
        <PostContext.Provider value={{posts, dispatch}}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;