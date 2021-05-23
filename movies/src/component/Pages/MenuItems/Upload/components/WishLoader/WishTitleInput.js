import React from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringEmpty} from "../../../../../../utils/Utils";

const validateValue = (text) => !isStringEmpty(text);

const wishTitleInput = (props) => {
    const {inputRef, onSearchDisable} = props;

    const {
        value: wishTitle,
        handleFieldTouch,
        handleTextFieldChange,
        isValid,
        hasError
    } = useInput(inputRef, validateValue);
    onSearchDisable(!isValid);

    return (
        <MyTextField
            isValid={!hasError}
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