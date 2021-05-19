import React from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";

const validateValue = (text) => (
    text.trim() !== ''
    && Number.isInteger(+text)
    && text.length === 4
);

const wishYearInput = (props) => {
    const {inputRef} = props;

    const {
        value: wishYear,
        handleTextFieldChange,
        handleFieldTouch,
        isValid,
        hasError
    } = useInput(inputRef, validateValue);

    return (
        <MyTextField
            isValid={!hasError}
            text={wishYear}
            label="Release year"
            helperText="Enter movie release year"
            inputRef={inputRef}
            required={false}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default wishYearInput;