const keys = Object.freeze(
    {
        currentPage: 'current-page',
        densePadding: 'dense-padding',
        rowsPerPage: 'rows-per-page',
    }
);

const callers = (key, value) => ({
    set: () => {
        if (value === undefined) alert(`Value to set '${key}' into localStorage is missing.`);
        return localStorage.setItem(key, value)
    },
    getNumeric: () => +localStorage.getItem(key),
    getBoolean: () => localStorage.getItem(key) === 'true',
    remove: () => localStorage.removeItem(key),
});

export const selectedPage = (valueToSet) => {
    return callers(keys.currentPage, valueToSet);
};

export const tableDensePadding = (valueToSet) => {
    return callers(keys.densePadding, valueToSet);
};

export const tableRowsPerPage = (valueToSet) => {
    return callers(keys.rowsPerPage, valueToSet);
};
