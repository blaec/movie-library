import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringExist} from "../../../../../../utils/Utils";

const validateValue = (text) => (isStringExist(text) && Number.isInteger(+text));

const fileTmdbIdInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;
    const {t} = useTranslation('common');

    const {
        value: tmdbId,
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
            text={tmdbId}
            disabled={!isSingleMovieUpload}
            label="tmdb id"
            inputRef={inputRef}
            required={true}
            helperText={t('helperText.typeTmdbId')}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default fileTmdbIdInput;