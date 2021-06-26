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

export const selectedPage = {
    set: globalFunctions(keys.currentPage).set,
    get: globalFunctions(keys.currentPage).getNumeric,
    remove: globalFunctions(keys.currentPage).remove,
}

export const tableDensePadding = {
    set: globalFunctions(keys.densePadding).set,
    get: globalFunctions(keys.densePadding).getBoolean,
    remove: globalFunctions(keys.densePadding).remove,
};

export const tableRowsPerPage = {
    set: globalFunctions(key).set,
    get: globalFunctions(key).getNumeric,
    remove: globalFunctions(key).remove,
};
