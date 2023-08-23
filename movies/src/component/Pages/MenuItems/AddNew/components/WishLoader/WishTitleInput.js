import React, {useEffect} from 'react';
import {useTranslation} from "react-i18next";

import MyTextField from "../../../../../../UI/MyTextField";
import useInput from "../../../../../../hooks/use-input";
import {isStringExist} from "../../../../../../utils/Utils";

const validateValue = (text) => isStringExist(text);

const wishTitleInput = (props) => {
    const {inputRef, onSearchDisable} = props;
    const {t} = useTranslation('common');

    const {
        value: wishTitle,
        handleFieldTouch,
        handleTextFieldChange,
        isValid,
        hasError
    } = useInput(inputRef, validateValue);

    useEffect(() => {
        onSearchDisable(!isValid);
    }, [isValid]);

    return (
        <MyTextField
            isValid={!hasError}
            text={wishTitle}
            label={t('text.title')}
            helperText={t('helperText.enterMovieTitle')}
            inputRef={inputRef}
            required={true}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default wishTitleInput;