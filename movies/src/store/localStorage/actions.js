const storeKeys = Object.freeze(
    {
        id: 'id',
        currentPage: 'currentPage',
    }
);

const callers = (key, value) => ({
    set: () => {
        if (value === undefined) alert(`Value to set '${key}' into localStorage is missing.`);
        return localStorage.setItem(key, value)
    },
    get: () => +localStorage.getItem(key),
    remove: () => localStorage.removeItem(key),
});

export const selectedPage = (valueToSet) => {
    return callers(storeKeys.currentPage, valueToSet);
};

export const selectedMovieId = (valueToSet) => {
    return callers(storeKeys.id, valueToSet);
};
