import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';
import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';
import PostContextProvider from '../../../context/PostContext';

//Child Components...
import Post from '../../functional/Post';

const StyledRelatedPostsContainer = styled(ContainerLayoutColumn)`
    padding: 1em;
`;

const RelatedPosts = (props) => {
    const { postId, relatedPostIds } = props;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getRelatedPost();
    }, []);

    const getRelatedPost = () => {
        const url = `${getBaseUrl()}posts/${postId}/related`;
        let idsToSend = '';
         if (relatedPostIds) {
            idsToSend = relatedPostIds.join()
         }
        axios.get(url, {
            headers: getRestApiCommonHeader(),
            params: { postIds: idsToSend},
        }).then((resp) => {
            if (resp.data.response) {
                setPosts(resp.data.response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const postList = posts.map((postDetails, index) => {
        return (<Post key={postDetails.id} postDetails={postDetails} ></Post>)
    });

    return (
        <Fragment>
            <ContainerLayoutRow alignment="center" style={{ justifyContent: ' flex-start' }}>
                <div style={{ padding: '1em' }}>
                    Related posts
                </div>
            </ContainerLayoutRow>
            <StyledRelatedPostsContainer alignment="center">
                {posts.length > 0 && postList}
                {posts.length == 0 && (
                    <div>No Realted Post Found</div>
                )}
            </StyledRelatedPostsContainer>
        </Fragment>
    )
}

RelatedPosts.propTypes = {
    relatedPostIds: PropTypes.array.isRequired,
    postId: PropTypes.number.isRequired
}

export default RelatedPosts;