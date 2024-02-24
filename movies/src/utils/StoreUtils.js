export const actionForbiddenMessage = (error, text) => {
    return `${error} | You're not allowed ${text}, please, contact administrator.`;
};

export const errorMessage = (error, text) => {
    return `${error} | Failed ${text}`;
};
