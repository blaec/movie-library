import {drawer, mobile} from "./Constants";
import {useTranslation} from "react-i18next";

/**
 * Extract year from date (like release date), date could be undefined or null
 * @param date date formatted like yyyy-mm-dd
 * @returns {string|*|string} empty string or year
 */

export const fullYear = (date) => {
    return date === undefined || date === null ? '' : date.split('-')[0];
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
    const year = fullYear(releaseDate);
    return `${title}${(year.length > 0 ? ` (${year})` : '')}`
};

export const playTime = (totalMinutes) => {
    const {t} = useTranslation('common');

    let hour = Math.floor(totalMinutes / 60);
    let minute = `0${totalMinutes % 60}`.slice(-2);

    return hour > 0
        ? `${hour} ${hour === 1 ? `${t('text.hr')}` : `${t('text.hrs')}`} ${minute} ${t('text.mins')}`
        : `${minute} ${t('text.mins')}`;
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
    return array && array.map(val => val.name).join(', ');
};

export const isObjectExist = (object) => {
    return object && (Object.keys(object).length !== 0 || object.constructor !== Object);
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
    return array && array.length > 0;
};

export const isArraysExist = (...arrays) => {
    return arrays.filter(array => isArrayExist(array))
        .length === arrays.length;
};

export const getMovieByTmdbId = (movies, tmdbId) => {
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

export const isMovieInCast = (collection, tmdbId) => {
    return collection.map(movie => +movie.id).includes(+tmdbId);
};

export const drawerWidth = (innerWidth) => {
    return innerWidth > mobile.windowWidth
        ? drawer.width
        : 0;
};

export const groupBy = (list) => {
    let previous;
    let result = [];
    list.forEach((item) => {
        if (previous) {
            if (item.id === previous.id) {
                previous = {
                    ...previous,
                    job: `${previous.job} | ${item.job}`,
                    department: `${previous.department} | ${item.department}`,
                }
            } else {
                result.push(previous);
                previous = item;
            }
        } else {
            previous = item;
        }
    });
    result.push(previous);

    return result;
};