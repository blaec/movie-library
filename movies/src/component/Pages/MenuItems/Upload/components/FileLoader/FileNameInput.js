import React from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";

const validateValue = (text) => text.trim() !== '';

const fileNameInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;

    const {
        value: fileName,
        handleFieldTouch,
        handleTextFieldChange,
        isValid,
        hasError
    } = useInput(inputRef, validateValue);
    onValid(isValid);

    return (
        <MyTextField
            isValid={!hasError || !isSingleMovieUpload}
            text={fileName}
            disabled={!isSingleMovieUpload}
            label="Exact file name"
            inputRef={inputRef}
            required={true}
            helperText="Enter exact file name with extension"
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default fileNameInput;