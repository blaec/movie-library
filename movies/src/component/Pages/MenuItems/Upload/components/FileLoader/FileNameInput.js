import React, {useState} from 'react';

import MyTextField from "../../../../../../UI/MyTextField";

const fileNameInput = (props) => {
    const {inputRef, isSingleMovieUpload} = props;

    const [fileName, setFileName] = useState('');

    const handleTextFieldChange = (text) => {
        setFileName(text);
    };

    return (
        <MyTextField
            text={fileName}
            disabled={!isSingleMovieUpload}
            label="Exact file name"
            inputRef={inputRef}
            required={true}
            helperText="Enter exact file name with extension"
            onChangeTextField={handleTextFieldChange}
        />
    );
};

export default fileNameInput;