import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';
import { PostContext } from '../../../context/PostContext';
import { POST_ACTIONS } from '../../../reducers/PostReducer';
import Post from '../../functional/Post';

const Posts = (props) => {

    const { posts, dispatch } = useContext(PostContext);
    const [isLoading, setIsLoading] = useState(false);
    const { slug, tag, after } = props;

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
        setIsLoading(true);
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
            setIsLoading(false)
        }).catch((err) => {
            console.log(err);
            setIsLoading(false)
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
            {(posts.length > 0 && !isLoading) && (
                <ContainerLayoutColumn alignment="center" style={{ width: '100%', justifyContent: 'flex-start' }}>
                    {postArray}
                </ContainerLayoutColumn>
            )}
            {
                (posts.length == 0 && !isLoading) && (
                    <ContainerLayoutColumn alignment="center" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        No Posts Found 🙁
                    </ContainerLayoutColumn>
                )
            }
            {
                (posts.length == 0 && isLoading) && (
                    <ContainerLayoutColumn alignment="center" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        Fetching, please wait ... 🤔
                    </ContainerLayoutColumn>
                )
            }
        </Fragment>
    )
}

Posts.propTypes = {
    category: PropTypes.string,
    tag: PropTypes.string,
    after: PropTypes.string
}

export default Posts;