import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import styles from './side-nav.module.css';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';

//Child Components...
import Category from '../../functional/Category';

const StyledCategoryList = styled.ul`

`;

const StyledTagList = styled.ul`

`;

const StyledCategoryListItem = styled.li`
    // margin-left: 1em;
    margin-top: 1em;
    list-style:none;
    text-align:center;
    font-weight: 400;
`;

const StyledListHeader = styled.div`
    border-radius: 10px; 
    text-align: center; 
    margin-bottom: 1em; 
    padding: 1em 0;
    border: 1px solid #1ce5e8;
`;

const SideNav = (props) => {
    const { categories } = props;

    const categoriesList = Object.keys(categories).map((key) => {
        return (<Category key={categories[key].ID} category={categories[key]}></Category>)
    })

    useEffect(() => {

    }, []);

    return (
        <Fragment>
            <ContainerLayoutColumn className={styles.navBarContainer}>
                <StyledCategoryList>
                    <StyledListHeader>
                        Category List
                    </StyledListHeader>
                    {categoriesList.length > 0 && (
                        <StyledCategoryListItem>
                            {categoriesList}
                        </StyledCategoryListItem>
                    )}
                    {categoriesList.length == 0 && (
                        <StyledCategoryListItem>
                            No Categories Found.
                        </StyledCategoryListItem>
                    )}
                </StyledCategoryList>

                <StyledTagList>
                    <StyledListHeader>
                        Tag List
                    </StyledListHeader>
                </StyledTagList>

            </ContainerLayoutColumn>
        </Fragment>
    )
}

export default SideNav;