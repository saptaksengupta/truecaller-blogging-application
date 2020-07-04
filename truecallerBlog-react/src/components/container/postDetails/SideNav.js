import React, { Fragment, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from './side-nav.module.css';

import { getBaseUrl, getRestApiCommonHeader } from '../../../Config';
import { ContainerLayoutColumn } from '../../styled/CommonUtils';

import { TagContext } from '../../../context/TagContext';
//Child Components...
import Category from '../../functional/Category';
import Tag from '../../functional/Tag';
import { TAG_ACTIONS } from '../../../reducers/TagReducer';

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
    const { categories } = props;
    const { tagContextState, dispatch } = useContext(TagContext);
    const [siteTagList, setSiteTagList] = useState([]);
    const [fetchingTags, setFetchingTags] = useState(false);

    useEffect(() => {
        //Restricting rest api call every time 
        // we open the sidenav
        const { siteTags } = tagContextState;
        debugger
        if (siteTags.length === 0) {
            getTagsBySiteId();
        } else {
            debugger;
            setSiteTagList(siteTags);
        }
    }, []);

    const getTagsBySiteId = () => {
        setFetchingTags(true);
        const url = `${getBaseUrl()}tags/`;
        axios.get(url, {
            headers: getRestApiCommonHeader()
        }).then((resp) => {
            if (resp.data.response) {
                dispatch({ type: TAG_ACTIONS.FLUSH_TAGS, payload: { } });
                const tags = resp.data.response;
                tags.map(tag => {
                    handleTags(tag, dispatch);
                });
                setSiteTagList(tags);
            }
            setFetchingTags(false);
        }).catch((err) => {
            console.log(err);
            setFetchingTags(false);
        });
    }

    const handleTags = (siteTag, dispatch) => {
        dispatch({ type: TAG_ACTIONS.SET_TAG, payload: { siteTag } });
    }

    const categoriesList = Object.keys(categories).map((key) => {
        return (<Category key={categories[key].ID} category={categories[key]}></Category>);
    })

    const siteTagsListJsx = siteTagList.map((tag) => {
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
                    {(siteTagList.length > 0 && !fetchingTags) && (
                        <StyledSiteTagListItem>
                            {siteTagsListJsx}
                        </StyledSiteTagListItem>
                    )}
                    {(siteTagList.length === 0 && !fetchingTags) && (
                        <StyledSiteTagListItem>
                            No Tags Found.
                        </StyledSiteTagListItem>
                    )}
                    {fetchingTags && (
                        <StyledSiteTagListItem>
                            Fetching Tags . . . 🤔
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