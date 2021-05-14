import React, {useState} from 'react';

import MyTextField from "../../../../../../UI/MyTextField";

const fileTmdbIdInput = (props) => {
    const {inputRef, isSingleMovieUpload} = props;
    const [tmdbId, setTmdbId] = useState('');

    const handleTextFieldChange = (text) => {
        setTmdbId(text);
    };

    return (
        <MyTextField
            text={tmdbId}
            disabled={!isSingleMovieUpload}
            label="tmdb id"
            inputRef={inputRef}
            required={true}
            helperText="Type exact tmdb id"
            onChangeTextField={handleTextFieldChange}
        />
    );
};

export default fileTmdbIdInput;