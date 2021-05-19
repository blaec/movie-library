import React from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";

const validateValue = (text) => (text.trim() !== '' && Number.isInteger(+text));

const fileTmdbIdInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;

    const {value: tmdbId, handleFieldTouch, handleTextFieldChange, isValid} = useInput(inputRef, validateValue);
    onValid(isValid);

    return (
        <MyTextField
            isNotValid={!isValid && isSingleMovieUpload}
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