import React, {useState} from 'react';

import MyTextField from "../../../../../../UI/MyTextField";

const fileTmdbIdInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;

    const [tmdbId, setTmdbId] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const validityCheck = (text) => !isTouched || text.length > 0;

    let isValid = validityCheck(tmdbId);
    const handleTextFieldChange = (text) => {
        setTmdbId(text);
        onValid(validityCheck(text));
    };

    const handleFieldTouch = () => {
        setIsTouched(true);
    };

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