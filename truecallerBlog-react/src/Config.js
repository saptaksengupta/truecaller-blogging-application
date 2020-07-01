
const API_BASE_URL = 'http://localhost:9999/';

const API_PREFIX = "api/v1/";

export const getBaseUrl = () => `${API_BASE_URL}${API_PREFIX}`;

export const SITE_ID = '107403796'


export const getRestApiCommonHeader = () => {
    return {
        siteid: SITE_ID
    }
}