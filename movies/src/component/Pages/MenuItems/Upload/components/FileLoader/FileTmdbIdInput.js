import React from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringEmpty} from "../../../../../../utils/Utils";

const validateValue = (text) => (!isStringEmpty(text) && Number.isInteger(+text));

const fileTmdbIdInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;

    const {
        value: tmdbId,
        handleFieldTouch,
        handleTextFieldChange,
        isValid,
        hasError
    } = useInput(inputRef, validateValue);
    onValid(isValid);

    return (
        <MyTextField
            isValid={!hasError || !isSingleMovieUpload}
            text={tmdbId}
            disabled={!isSingleMovieUpload}
            label="tmdb id"
            inputRef={inputRef}
            required={true}
            helperText="Type exact tmdb id"
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default fileTmdbIdInput;