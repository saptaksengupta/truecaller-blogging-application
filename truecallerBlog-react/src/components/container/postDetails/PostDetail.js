import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import styles from './post-detail.module.css';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';
import { ContainerLayoutColumn } from '../../styled/CommonUtils';
import TagContextProvider from '../../../context/TagContext';

//Child Components...
import SideNav from './SideNav';
import RelatedPosts from './RelatedPosts';

const StyledPostContent = styled.div`
    padding: 1em;
    overflow-y: scroll;
    font-weight: 300;
    color: black;
`;

const StyledPostTitle = styled.div`
    font-weight: 700;
    font-size: 2em;
    padding: 1em;
`;

const PostDetail = (props) => {
    const [postDetail, setPosDetail] = useState(null);
    const { postId } = props.match.params;

    const [showSideNav, setShowSideNav] = useState(false);

    useEffect(() => {
        getPostDetails(postId);
    }, []);

    const getPostDetails = (postId) => {
        const url = `${getBaseUrl()}posts/${postId}`;
        axios.get(url, {
            headers: getRestApiCommonHeader()
        }).then((resp) => {
            if (resp.data.response) {
                setPosDetail(resp.data.response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    }

    const sideBarClssNames = `${styles.navBar}`;
    const postContainerClassNames = `${styles.postContainer} ${showSideNav ? styles.sideNavOpen : styles.sideNavClose}`;

    return (
        postDetail ? (
            <Fragment>
                <div className={styles.postSideBarContainer}>
                    <TagContextProvider>
                        <div className={sideBarClssNames}>
                            {showSideNav && (
                                <SideNav categories={postDetail.categories}></SideNav>
                            )}
                        </div>
                    </TagContextProvider>
                    <ContainerLayoutColumn className={postContainerClassNames} alignment="start">
                        <div style={{ minWidth: '97%', margin: '1em 1em 0 1em' }}>
                            <div className={styles.postBanner} style={{ backgroundImage: `url(${postDetail.thumbnail})` }} >
                                <div onClick={(e) => { toggleSideNav() }}>Menu</div>
                            </div>
                        </div>

                        <StyledPostContent >
                            <StyledPostTitle>
                                {postDetail.title}
                            </StyledPostTitle>
                            <StyledPostContent dangerouslySetInnerHTML={{ __html: postDetail.content }}>

                            </StyledPostContent>
                        </StyledPostContent>
                        <RelatedPosts postId={postDetail.id} relatedPostIds={postDetail.relatedPosts} ></RelatedPosts>
                    </ContainerLayoutColumn>
                </div>
            </Fragment>
        ) : 'Fetching Post Details...'

    )
}

export default PostDetail;