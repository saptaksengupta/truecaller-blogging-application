import React, { createContext, useReducer } from 'react';
import { TagReducer } from '../reducers/TagReducer';


export const TagContext = createContext();

const TagContextProvider = (props) => {

    const initialState = {
        siteTags: []
    }

    const [tagContextState, dispatch] = useReducer(TagReducer, initialState);
    return (
        <TagContext.Provider value={{tagContextState, dispatch}}>
            {props.children}
        </TagContext.Provider>
    )
}

export default TagContextProvider;