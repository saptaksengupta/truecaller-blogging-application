import React, { Fragment, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';
import { PostContext } from '../../../context/PostContext';
import { POST_ACTIONS } from '../../../reducers/PostReducer';
import Post from '../../functional/Post';

const Posts = (props) => {

    const { posts, dispatch } = useContext(PostContext);

    const {slug, tag, after} = props;

    useEffect(() => {
        getPosts();
    }, []);

    const getUrlWithQueryParams = () => {
        let url = `${getBaseUrl()}posts`;
        if (slug) {
            url = `${url}?slug=${slug}`;
        }

        if (tag) {
            url = `${url}?tag=${tag}`;
        }

        if (after) {
            url = `${url}?after=${after}`;
        }
        return url
    }

    const getPosts = () => {
        const url = getUrlWithQueryParams();
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
            <Post postDetails={post} key={post.id} itemIndex={index}></Post>
        )
    });

    return (
        <Fragment>
            <ContainerLayoutColumn alignment="center" style={{ width: '100%', justifyContent: 'flex-start' }}>
                {postArray}
            </ContainerLayoutColumn>
        </Fragment>
    )
}

Posts.propTypes = {
    category: PropTypes.string,
    tag: PropTypes.string,
    after: PropTypes.string
}

export default Posts;