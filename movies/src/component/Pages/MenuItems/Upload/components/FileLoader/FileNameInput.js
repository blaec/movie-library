import React, {useEffect, useState} from 'react';

import MyTextField from "../../../../../../UI/MyTextField";

const fileNameInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;

    const [fileName, setFileName] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const validityCheck = (text) => !isTouched || text.length > 0;

    let isValid = validityCheck(fileName);
    const handleTextFieldChange = (text) => {
        setFileName(text);
        onValid(validityCheck(text));
    };

    const handleFieldTouch = () => {
        setIsTouched(true);
    };

    const {current: {value: fileNameRefValue} = {value: ''}} = inputRef;
    useEffect(() => {
        if (fileNameRefValue === '') {
            setFileName('');
            onValid(validityCheck(''));
        }
    }, [fileNameRefValue]);

    return (
        <MyTextField
            isNotValid={!isValid && isSingleMovieUpload}
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