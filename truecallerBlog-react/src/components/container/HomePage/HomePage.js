import React, { Fragment, useContext } from 'react';

import { ContainerLayoutRow, ContainerLayoutColumn } from '../../styled/CommonUtils';
import PostContextProvider from '../../../context/PostContext';

//Child Components...
import Posts from '../posts/Posts';


const HomePage = () => {
    return (
        <Fragment>
            <PostContextProvider>
                <ContainerLayoutColumn alignment="center" style={{ height: '100%', justifyContent:' flex-start' }}>
                    <div style={{padding: '1em', minHeight: '50px'}}>
                        Word press Blogging app
                    </div>
                    <Posts></Posts>
                </ContainerLayoutColumn>
            </PostContextProvider>

        </Fragment>
    )
}

export default HomePage;