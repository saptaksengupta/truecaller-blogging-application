import React, { Fragment, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';
import { DefaultButton } from '../../styled/Buttons';
import { PostContext } from '../../../context/PostContext';
import { POST_ACTIONS } from '../../../reducers/PostReducer';
import {DateTimeUtils} from '../../../shared/DateTimehelper';
import Post from '../../functional/Post';

const Posts = (props) => {

    const { postContextState, dispatch } = useContext(PostContext);
    const [isLoading, setIsLoading] = useState(false);

    const { slug, tag, before } = props;
    const posts = postContextState.posts;

    useEffect(() => {
        getPosts();
    }, []);

    const getUrlWithQueryParams = (before=undefined) => {
        let url = `${getBaseUrl()}posts`;
        let anyQueryAdded = false;
        if (slug) {
            url = `${url}?slug=${slug}`;
            anyQueryAdded = true;
        }

        if (tag) {
            url = `${url}?tag=${tag}`;
            anyQueryAdded = true;
        }

        if (before) {
            before = DateTimeUtils.getIsoFormat(before);
            let queryToAppend = `?before=${before}`;
            if (anyQueryAdded) {
                queryToAppend = `&before=${before}`;
            }
            url = `${url}${queryToAppend}`;
        }
        return url
    }

    const getPosts = (before) => {
        setIsLoading(true);
        const url = getUrlWithQueryParams(before);
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

    const getOlderPosts = () => {
        dispatch({ type: POST_ACTIONS.FLUSH_POSTS, payload: {} });
        const before = posts[posts.length - 1].date;
        getPosts(before);
    }

    const handlePosts = (post) => {
        dispatch({ type: POST_ACTIONS.SET_POST, payload: { post } });
    }

    const postArray = posts.map((post, index) => {
        return (
            <Post postDetails={post} key={post.id} itemIndex={index}></Post>
        )
    });

    return (
        <Fragment>
            {(posts.length > 0 && !isLoading) && (
                <div>
                    <ContainerLayoutColumn alignment="center" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        {postArray}
                    </ContainerLayoutColumn>
                    <ContainerLayoutRow alignment="center" style={{padding: '1em'}}>
                        <div>
                            <DefaultButton onClick={(e) => getOlderPosts()} >Older Posts</DefaultButton>
                        </div>
                    </ContainerLayoutRow>
                </div>
            )}
            {
                (posts.length == 0 && !isLoading) && (
                    <ContainerLayoutColumn alignment="center" style={{ width: '100%', justifyContent: 'flex-start' }}>
                        No Posts Found 🙁
                    </ContainerLayoutColumn>
                )
            }
            {
                (isLoading) && (
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
    tag: PropTypes.string
}

export default Posts;