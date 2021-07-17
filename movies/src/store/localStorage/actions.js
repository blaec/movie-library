const keys = Object.freeze(
    {
        scrollPosition: 'scroll-position',
        scrollLocation: 'scroll-location',
        densePadding: 'dense-padding',
        rowsPerPage: 'rows-per-page',
        currentLocation: 'current-location',
        previousLocation: 'previous-location',
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

export const scrollLocation = {
    set: globalFunctions(keys.scrollLocation).set,
    get: globalFunctions(keys.scrollLocation).get,
    remove: globalFunctions(keys.scrollLocation).remove,
};

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

export const currentLocation = {
    set: globalFunctions(keys.currentLocation).set,
    get: globalFunctions(keys.currentLocation).get,
};

export const previousLocation = {
    set: globalFunctions(keys.previousLocation).set,
    get: globalFunctions(keys.previousLocation).get,
};
