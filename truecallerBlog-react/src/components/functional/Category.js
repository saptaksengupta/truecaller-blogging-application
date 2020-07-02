import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { ContainerLayoutColumn, ContainerLayoutRow } from '../styled/CommonUtils';
import { DefaultCard } from '../styled/cards';
import styles from './post.module.css';

const StyledPostCount = styled.span`
    font-size: 0.7em;
    font-weight: 200;
    display: flex;
    align-items: center;
    margin-left: 0.5em;
`;

const StyledCategoryContainer = styled(DefaultCard)`
    display: flex;
    cursor: pointer;
    margin: 0 0 1em 0;
`;

const Category = (props) => {

    const {category} = props
    const history = useHistory();

    const onCategoryClicked = () => {
        history.push(`/categories/${category.slug}`);
    }

    return (
        <Fragment>
            <StyledCategoryContainer onClick={(e) => onCategoryClicked()}>
                <div>{category.name}</div>
                <StyledPostCount>
                    ({category.post_count})
                </StyledPostCount>
            </StyledCategoryContainer>
        </Fragment>
    )
}

export default Category;