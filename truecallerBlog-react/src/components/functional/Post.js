import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ContainerLayoutColumn, ContainerLayoutRow } from '../styled/CommonUtils';
import { ClockIcon } from '../styled/Icons';
import { DefaultCard } from '../styled/cards';
import styles from './post.module.css';
import { DateTimeUtils } from '../../shared/DateTimehelper';


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
        window.location.reload();
    }

    return (
        <Fragment>
            <DefaultCard style={{ "--animation-order": props.itemIndex }} onClick={(e) => onPostClicked(postDetails.id)} className={styles.postCard} >
                <ContainerLayoutRow alignment="start" >
                    <StyledPostImage>
                        <img height="250px" src={postDetails.thumbnail} className={styles.thumbnail} ></img>
                    </StyledPostImage>
                    <ContainerLayoutColumn style={{padding: '1em'}}>
                        <StyledPostTitle>
                            {postDetails.title}
                        </StyledPostTitle>
                        <StyledPostContent dangerouslySetInnerHTML={{__html: postDetails.excerpt}} >
                        </StyledPostContent>
                        <ContainerLayoutRow style={{paddingTop: '1em', marginTop: '1em', borderTop: '1px solid #efefef'}}>
                            <ClockIcon height="1em" width="1em"></ClockIcon>
                            <StyledDate>
                                {DateTimeUtils.getFromNow(postDetails.date)}
                            </StyledDate>
                        </ContainerLayoutRow>
                    </ContainerLayoutColumn>
                </ContainerLayoutRow>
            </DefaultCard>
        </Fragment>
    )
}

Post.propTypes = {
    postDetails: PropTypes.object.isRequired
}

export default Post;