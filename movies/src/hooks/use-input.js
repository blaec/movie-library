import React, {useEffect, useState} from 'react';

const useInput = (inputRef, validateValue, onValid) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(enteredValue) || !isTouched;

    const handleTextFieldChange = (text) => {
        setEnteredValue(text);
        onValid(validateValue(text) || !isTouched);
    };

    const handleFieldTouch = () => {
        setIsTouched(true);
    };

    const {current: {value: tmdbIdRefValue} = {value: ''}} = inputRef;
    useEffect(() => {
        if (tmdbIdRefValue === '') {
            setEnteredValue('');
            onValid(!isTouched);
        }
    }, [tmdbIdRefValue]);

    return {
        value: enteredValue,
        handleTextFieldChange,
        handleFieldTouch,
        isValid
    };
};

export default useInput;