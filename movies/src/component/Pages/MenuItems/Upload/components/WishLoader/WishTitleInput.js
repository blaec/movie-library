import React from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";

const validateValue = (text) => text.trim() !== '';

const wishTitleInput = (props) => {
    const {inputRef, onSearchDisable} = props;

    const {value: wishTitle, handleFieldTouch, handleTextFieldChange, isValid} = useInput(inputRef, validateValue);
    onSearchDisable(!isValid);

    return (
        <MyTextField
            isValid={isValid}
            text={wishTitle}
            label="Movie title"
            helperText="Enter movie title"
            inputRef={inputRef}
            required={true}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default wishTitleInput;