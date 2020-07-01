import React, { Fragment, useEffect, useContext } from 'react';

import { ContainerLayoutRow } from '../../styled/CommonUtils';
import { ResponsiveContext } from '../../../context/ResponsiveContext';
import { SUPPORTED_DEVICES } from '../../../reducers/ResponsiveReducer'


const HomePage = () => {
    const { responsiveState } = useContext(ResponsiveContext);
    const currentDevice = responsiveState.device;
    return (
        <Fragment>
            <ContainerLayoutRow alignment="center" style={{ height: '100%' }}>
                
                Word press Blogging app
            </ContainerLayoutRow>
        </Fragment>
    )
}

export default HomePage;