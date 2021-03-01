import * as actionTypes from './actionTypes';

export const changeSearch = (string) => {
    return {
        type: actionTypes.CHANGE_FILTER,
        newSearch: string
    }
};