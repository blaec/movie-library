/**
 * Extract year from release date, release date could be undefined
 * @param releaseDate release date formatted like yyyy-mm-dd
 * @returns {string|*|string} empty string or year
 */
export const releaseDateYear = (releaseDate) => {
    return releaseDate === undefined ? '' : releaseDate.split('-')[0];
};

/**
 * Return full tile like:
 *   `Full Title (year)` or
 *   `Full title` - if releaseDate not exists
 *
 * @param title        movie title
 * @param releaseDate  release date in format yyyy-mm-dd
 * @returns {string} full title
 */
export const fullTitle = (title, releaseDate) => {
    const year = releaseDateYear(releaseDate);
    return `${title}${(year.length > 0 ? ` (${year})` : '')}`
};

export const playTime = (totalMinutes) => {
    let hour = Math.floor(totalMinutes / 60);
    let minute = `0${totalMinutes % 60}`.slice(-2);

    return hour > 0
        ? `${hour} ${hour === 1 ? 'hr' : 'hrs'} ${minute} mins`
        : `${minute} mins`;
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
};

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};