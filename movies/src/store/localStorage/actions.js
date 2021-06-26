const keys = Object.freeze(
    {
        currentPage: 'current-page',
        densePadding: 'dense-padding',
        rowsPerPage: 'rows-per-page',
    }
);

const globalFunctions = (key) => ({
    set: (value) => localStorage.setItem(key, value),
    getNumeric: () => +localStorage.getItem(key),
    getBoolean: () => localStorage.getItem(key) === 'true',
    remove: () => localStorage.removeItem(key),
});

export const selectedPage = () => {
    let key = keys.currentPage;
    return {
        set: (valueToSet) => globalFunctions(key).set(valueToSet),
        get: globalFunctions(key).getNumeric,
        remove: globalFunctions(key).remove,
    };
};

export const tableDensePadding = () => {
    let key = keys.densePadding;
    return {
        set: (valueToSet) => globalFunctions(key).set(valueToSet),
        get: globalFunctions(key).getBoolean,
        remove: globalFunctions(key).remove,
    };
};

export const tableRowsPerPage = () => {
    let key = keys.rowsPerPage;
    return {
        set: (valueToSet) => globalFunctions(key).set(valueToSet),
        get: globalFunctions(key).getNumeric,
        remove: globalFunctions(key).remove,
    };
};
