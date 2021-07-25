import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringExist} from "../../../../../../utils/Utils";

const validateValue = (text) => isStringExist(text);

const fileNameInput = (props) => {
    const {inputRef, isSingleMovieUpload, onValid} = props;
    const {t} = useTranslation('common');

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
            label={t('text.exactFileName')}
            inputRef={inputRef}
            required={true}
            helperText={t('helperText.enterExactFileName')}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default fileNameInput;