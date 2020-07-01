import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ContainerLayoutColumn, ContainerLayoutRow } from '../styled/CommonUtils';
import { ClockIcon } from '../styled/Icons';
import { DefaultCard } from '../styled/cards';
import styles from './post.module.css';


const StyledPostImage = styled.div`

`;

const StyledPostTitle = styled.div`
    font-size: 1.8em;
`;

const StyledPostContent = styled.div`
    font-size: 1em;
    font-weight: 500;
    color: gray;
`;

const StyledDate = styled.div`
    font-size: 1em;
    margin-left: 0.5em;
    font-weight: 300;
`;



const Post = (props) => {
    const { postDetails } = props;
    const history = useHistory();

    const onPostClicked = (postId) => {
        history.push(`/posts/${postId}`);
    }

    return (
        <Fragment>
            <DefaultCard onClick={(e) => onPostClicked(postDetails.id)} className={styles.postCard} >
                <ContainerLayoutRow alignment="start" >
                    <StyledPostImage src={postDetails.thumbnail}>
                        <img height="auto" width="320" src={postDetails.thumbnail} style={{borderRadius: '5px'}}></img>
                    </StyledPostImage>
                    <ContainerLayoutColumn style={{padding: '1em'}}>
                        <StyledPostTitle>
                            {postDetails.title}
                        </StyledPostTitle>
                        <StyledPostContent dangerouslySetInnerHTML={{__html: postDetails.excerpt}} >
                        </StyledPostContent>
                        <ContainerLayoutRow>
                            <ClockIcon height="1em" width="1em"></ClockIcon>
                            <StyledDate>
                                {postDetails.date}
                            </StyledDate>
                        </ContainerLayoutRow>
                    </ContainerLayoutColumn>
                </ContainerLayoutRow>
            </DefaultCard>
        </Fragment>
    )
}

export default Post;