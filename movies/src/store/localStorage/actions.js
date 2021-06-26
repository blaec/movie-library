const keys = Object.freeze(
    {
        currentPage: 'current-page',
        densePadding: 'dense-padding',
        rowsPerPage: 'rows-per-page',
    }
);

const globalFunctions = (key, value) => ({
    set: () => {
        if (value === undefined) alert(`Value to set '${key}' into localStorage is missing.`);
        return localStorage.setItem(key, value)
    },
    getNumeric: () => +localStorage.getItem(key),
    getBoolean: () => localStorage.getItem(key) === 'true',
    remove: () => localStorage.removeItem(key),
});

export const selectedPage = (valueToSet) => {
    let key = keys.currentPage;
    return {
        set: globalFunctions(key, valueToSet).set,
        get: globalFunctions(key, valueToSet).getNumeric,
        remove: globalFunctions(key, valueToSet).remove,
    };
};

export const tableDensePadding = (valueToSet) => {
    let key = keys.densePadding;
    return {
        set: globalFunctions(key, valueToSet).set,
        get: globalFunctions(key, valueToSet).getBoolean(),
        remove: globalFunctions(key, valueToSet).remove,
    };
};

export const tableRowsPerPage = (valueToSet) => {
    let key = keys.rowsPerPage;
    return {
        set: globalFunctions(key, valueToSet).set,
        get: globalFunctions(key, valueToSet).getNumeric,
        remove: globalFunctions(key, valueToSet).remove,
    };
};
