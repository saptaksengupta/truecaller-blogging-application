import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from './side-nav.module.css';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';
import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';

//Child Components...
import Category from '../../functional/Category';
import Tag from '../../functional/Tag';

const StyledCategoryList = styled.ul`
`;

const StyledTagList = styled.ul`
`;

const StyledSiteTagListItem = styled.li`
    margin-top: 1em;
    list-style:none;
    text-align:center;
    font-weight: 400;
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
    const { categories, siteTgas } = props;
    const [siteTags, setSiteTags] = useState([]);

    useEffect(() => {
        getTagsBySiteId();
    }, []);

    const getTagsBySiteId = () => {
        const url = `${getBaseUrl()}tags/`;
        axios.get(url, {
            headers: getRestApiCommonHeader()
        }).then((resp) => {
            if (resp.data.response) {
                setSiteTags(resp.data.response);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const categoriesList = Object.keys(categories).map((key) => {
        return (<Category key={categories[key].ID} category={categories[key]}></Category>);
    })

    const siteTagsList = siteTags.map((tag, index) => {
        return (<Tag tag={tag} key={tag.ID}></Tag>);
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
                    {siteTagsList.length > 0 && (
                        <StyledSiteTagListItem>
                            {siteTagsList}
                        </StyledSiteTagListItem>
                    )}
                    {siteTagsList.length == 0 && (
                        <StyledSiteTagListItem>
                            No Tags Found.
                        </StyledSiteTagListItem>
                    )}
                </StyledTagList>
            </ContainerLayoutColumn>
        </Fragment>
    )
}

SideNav.propTypes = {
    siteTags: PropTypes.array,
    categories: PropTypes.object
}


export default SideNav;