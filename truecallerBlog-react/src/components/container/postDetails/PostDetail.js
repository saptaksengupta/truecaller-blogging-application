import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import styles from './post-detail.module.css';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';
import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';

//Child Components...

const StyledPostContent = styled.div`
    padding: 1em;
    overflow-y: scroll;
    font-weight: 300;
    color: black;
`;

const PostDetail = (props) => {
    const [postDetail, setPosDetail] = useState(null);
    const { postId } = props.match.params;
    
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

    return (
        postDetail ? (
            <Fragment>
                <ContainerLayoutColumn alignment="start" style={{ justifyContent: 'flex-start', height: '100%' }}>
                    <div style={{top:'0', minWidth: '100%'}}>
                        <div className={styles.postBanner} style={{backgroundImage: `url(${postDetail.thumbnail})`}} >
                            {postDetail.title}
                        </div>
                    </div>
                    <StyledPostContent dangerouslySetInnerHTML={{__html: postDetail.content}}>
                    </StyledPostContent>
                </ContainerLayoutColumn>
            </Fragment>
        ) : 'Fetching Post Details...'

    )
}

export default PostDetail;