export const actionForbiddenMessage = (error, text) => {
    return `${error} | You're not allowed ${text}, please, contact administrator.`;
};

export const errorMessage = (error, text) => {
    return `${error} | Failed ${text}`;
};

export const isAccessForbidden = (error) => {
    return error && error.response && error.response.status === 403;
};