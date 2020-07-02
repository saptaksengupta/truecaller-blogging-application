import React, { Fragment } from 'react';
import styled from 'styled-components';
import styles from './side-nav.module.css';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';

//Child Components...
import Category from '../../functional/Category';

const StyledCategoryList = styled.ul`

`;

const StyledCategoryListItem = styled.li`
    // margin-left: 1em;
    margin-top: 1em;
    list-style:none;
    text-align:center;
    font-weight: 400;
`;

const SideNav = (props) => {
    const { categories } = props;

    const categoriesList = Object.keys(categories).map((key) => {
        return (<Category key={categories[key].ID} category={categories[key]}></Category>)
    })

    return (
        <Fragment>
            <ContainerLayoutColumn className={styles.navBarContainer}>
                <StyledCategoryList>
                    <div style={{ borderRadius: '10px', textAlign: 'center', marginBottom: '1em', padding: '1em 0', border: '1px solid #1ce5e8'}}>Category List</div>
                    <StyledCategoryListItem>
                        {categoriesList}
                    </StyledCategoryListItem>
                </StyledCategoryList>
            </ContainerLayoutColumn>
        </Fragment>
    )
}

export default SideNav;