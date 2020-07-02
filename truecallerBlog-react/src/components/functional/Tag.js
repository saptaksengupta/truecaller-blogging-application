import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ContainerLayoutColumn, ContainerLayoutRow } from '../styled/CommonUtils';
import { DefaultCard } from '../styled/cards';




const Tag = (props) => {

    const {tag} = props

    const onTagClicked = () => {
        // history.push(`/posts/${postId}`);
    }

    return (
        <Fragment>
            <DefaultCard onClick={(e) => onTagClicked()}  >
                {tag.name}
            </DefaultCard>
        </Fragment>
    )
}

export default Tag;