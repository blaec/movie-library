import {useEffect} from 'react';
import {useSelector} from "react-redux";

import {isStringExist} from "../utils/Utils";

import {useSnackbar} from "notistack";

const mySnackbar = () => {
    const {message, type, uniqueId} = useSelector(state => state.feedback.snackbar);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if (isStringExist(message)) {
            enqueueSnackbar(message, {variant: type});
        }
    }, [uniqueId]);

    return null;
};

export default mySnackbar;
