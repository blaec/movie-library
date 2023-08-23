import React from 'react';
import {useTranslation} from "react-i18next";

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringExist} from "../../../../../../utils/Utils";

const validateValue = (text) => (
    isStringExist(text)
    && Number.isInteger(+text)
    && text.length === 4
);

const wishYearInput = (props) => {
    const {inputRef} = props;
    const {t} = useTranslation('common');

    const {
        value: wishYear,
        handleTextFieldChange,
        handleFieldTouch,
        hasError
    } = useInput(inputRef, validateValue);

    return (
        <MyTextField
            isValid={!hasError}
            text={wishYear}
            label={t('text.releaseYear')}
            helperText={t('helperText.enterReleaseYear')}
            inputRef={inputRef}
            required={false}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default wishYearInput;