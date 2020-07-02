import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { ContainerLayoutColumn, ContainerLayoutRow } from '../styled/CommonUtils';
import { DefaultCard } from '../styled/cards';


const StyledSiteTagsContainer = styled(DefaultCard)`
    display: flex;
    cursor: pointer;
    margin: 0 0 1em 0;
`;



const Tag = (props) => {

    const {tag} = props
    const history = useHistory();

    const onTagClicked = () => {
        history.push(`/tags/${tag.slug}`);
    }

    return (
        <Fragment>
            <StyledSiteTagsContainer onClick={(e) => onTagClicked()}  >
                {tag.name}
            </StyledSiteTagsContainer>
        </Fragment>
    )
}

export default Tag;