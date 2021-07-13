const keys = Object.freeze(
    {
        scrollPosition: 'scroll-position',
        densePadding: 'dense-padding',
        rowsPerPage: 'rows-per-page',
        lastLocation: 'last-location',
    }
);

const globalFunctions = (key) => ({
    set: (value) => localStorage.setItem(key, value),
    get: () => localStorage.getItem(key),
    getNumeric: () => +localStorage.getItem(key),
    getBoolean: () => localStorage.getItem(key) === 'true',
    remove: () => localStorage.removeItem(key),
});

export const scrollPosition = {
    set: globalFunctions(keys.scrollPosition).set,
    get: globalFunctions(keys.scrollPosition).getNumeric,
    remove: globalFunctions(keys.scrollPosition).remove,
}

export const tableDensePadding = {
    set: globalFunctions(keys.densePadding).set,
    get: globalFunctions(keys.densePadding).getBoolean,
    remove: globalFunctions(keys.densePadding).remove,
};

export const tableRowsPerPage = {
    set: globalFunctions(keys.rowsPerPage).set,
    get: globalFunctions(keys.rowsPerPage).getNumeric,
    remove: globalFunctions(keys.rowsPerPage).remove,
};

export const lastLocation = {
    set: globalFunctions(keys.lastLocation).set,
    get: globalFunctions(keys.lastLocation).get,
    remove: globalFunctions(keys.lastLocation).remove,
};
