const storeKeys = Object.freeze(
    {
        id: 'id',
        currentPage: 'currentPage',
    }
);

export const saveCurrentPage = (page) => {
    localStorage.setItem(storeKeys.currentPage, page);
};
export const getCurrentPage = () => {
    return +localStorage.getItem(storeKeys.currentPage);
};
export const removeCurrentPage = () => {
    localStorage.removeItem(storeKeys.currentPage);
};
