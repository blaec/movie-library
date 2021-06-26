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
    let key = storeKeys.currentPage;
    return callers(key, valueToSet);
};

export const selectedMovieId =
    {
        set: (val) => localStorage.setItem(storeKeys.id, val),
        get: () => +localStorage.getItem(storeKeys.id),
        remove: () => localStorage.removeItem(storeKeys.id),
    };
