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
 * Check if condition equals N/A or undefined or empty string
 *
 * @param condition condition
 * @param returnVal optional - return value, if missing - returns condition
 * @returns {null|*} when condition is N/A
 */
export const isSafe = (condition, returnVal) => {
    return condition === undefined || 'N/A' === condition || !isStringsExist(condition)
        ? null
        : returnVal || condition;
};

export const joinNames = (array) => {
    return array.map(val => val.name).join(', ');
};

export const isObjectExist = (object) => {
    return Object.keys(object).length !== 0 || object.constructor !== Object;
};

export const isObjectsExist = (...objects) => {
    return objects.filter(object => isObjectExist(object))
                  .length === objects.length;
};

export const isStringExist = (string) => {
    return string !== undefined && string !== null && string.trim() !== '';
};

export const isStringsExist = (...strings) => {
    return strings.filter(string => isStringExist(string))
                  .length === strings.length;
};

export const isArrayExist = (array) => {
    return array.length > 0;
};

export const isArraysExist = (...arrays) => {
    return arrays.filter(array => isArrayExist(array))
        .length === arrays.length;
};

export const getMovieById = (movies, tmdbId) => {
    return movies.find(movie => movie.tmdbId === tmdbId) || {};
};

/**
 * Strip supplied string from spaces and dashes
 * @param str string before change
 * @returns string without spaces and dashes
 */
export const stripString = (str) => {
    return str.replace(/\s/g, '').replace(/-/g, '').toLowerCase();
};

export const getFutureDate = (addYear, addMonth = 0, addDay = 0) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    return new Date(year + addYear, month + addMonth, day + addDay).toISOString().split('T')[0];
};

export const isMovieInCollection = (collection, id) => {
    return collection.map(movie => +movie.tmdbId).includes(id);
};
