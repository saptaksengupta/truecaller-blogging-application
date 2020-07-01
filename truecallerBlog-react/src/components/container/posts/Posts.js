import React, { Fragment, useContext, useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';
import { PostContext } from '../../../context/PostContext';
import { POST_ACTIONS } from '../../../reducers/PostReducer';
import Post from '../../functional/Post';



const Posts = (props) => {

    const { posts, dispatch } = useContext(PostContext);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        const url = `${getBaseUrl()}posts`;
        axios.get(url, {
            headers: getRestApiCommonHeader()
        }).then((resp) => {
            if (resp.data.response.length > 0) {
                const posts = resp.data.response;
                posts.map(post => {
                    handlePosts(post, dispatch);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const handlePosts = (post) => {
        dispatch({ type: POST_ACTIONS.SET_POST, payload: post });
    }

    const postArray = posts.map((post, index) => {
        return (
            <Post postDetails={post} key={post.id}></Post>
        )
    });

    return (
        <Fragment>
            <ContainerLayoutColumn alignment="center" style={{ marginTop:'3em', height: '100%', width: '100%', justifyContent: 'flex-start' }}>
                {postArray}
            </ContainerLayoutColumn>
        </Fragment>
    )
}

export default Posts;