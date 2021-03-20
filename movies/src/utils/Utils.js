export const year = (fullDate) => {
    return fullDate.split('-')[0];
};

export const playTime = (totalMinutes) => {
    let hour = Math.floor(totalMinutes / 60);
    let minute = `0${totalMinutes % 60}`.slice(-2);

    return hour > 0
        ? `${hour} ${hour === 1 ? 'hr' : 'hrs'} ${minute} mins`
        : `${minute} mins`;
};

export const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

/**
 * Check if condition equals N/A
 *
 * @param condition condition
 * @param returnVal optional - return value, if missing - returns condition
 * @returns {null|*} when condition is N/A
 */
export const NA_Safe = (condition, returnVal) => {
    return 'N/A' === condition
        ? null
        : returnVal || condition;
};

export const joinNames = (array) => {
    return array.map(val => val.name).join(', ');
}
