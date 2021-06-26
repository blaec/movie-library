const storeKeys = Object.freeze(
    {
        id: 'id',
        currentPage: 'currentPage',
    }
);

export const selectedPage =
    {
        set: (val) => localStorage.setItem(storeKeys.currentPage, val),
        get: () => +localStorage.getItem(storeKeys.currentPage),
        remove: () => localStorage.removeItem(storeKeys.currentPage),
    };

export const selectedMovieId =
    {
        set: (val) => localStorage.setItem(storeKeys.id, val),
        get: () => +localStorage.getItem(storeKeys.id),
        remove: () => localStorage.removeItem(storeKeys.id),
    };
