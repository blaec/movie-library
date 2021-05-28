import React, {useEffect} from 'react';

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringEmpty} from "../../../../../../utils/Utils";

const validateValue = (text) => !isStringEmpty(text);

const fileNameInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;

    const {
        value: fileName,
        handleFieldTouch,
        handleTextFieldChange,
        isValid,
        hasError
    } = useInput(inputRef, validateValue);

    useEffect(() => {
        onValid(isValid);
    }, [isValid]);

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