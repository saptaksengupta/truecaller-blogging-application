import moment from 'moment';

const parse = (dateObj, format) => {
    let parsedDate = moment(dateObj);

    if(format) 
        return parsedDate.format(format);
    
    return parsedDate;
}

const parseDate = (date, format = null) => {
    return parse(date, format);
}

const parseTime = (dateTimeStr, format = null) => {
    return parse(dateTimeStr, format);
}

const getFromNow = (dateTimeStr) => {
    return moment(dateTimeStr).fromNow();
}

const getIsoFormat = (dateTimeStr) => {
    return moment(dateTimeStr).toISOString();
}

export const DateTimeUtils = {
    parseDate: parseDate,
    parseTime: parseTime,
    getFromNow: getFromNow,
    getIsoFormat: getIsoFormat
}