import React, {useEffect, useState} from 'react';

const useInput = (inputRef, validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const isValid = validateValue(enteredValue) || !isTouched;

    const handleTextFieldChange = (text) => {
        setEnteredValue(text);
    };

    const handleFieldTouch = () => {
        setIsTouched(true);
    };

    const {current: {value: tmdbIdRefValue} = {value: ''}} = inputRef;
    useEffect(() => {
        if (tmdbIdRefValue === '') {
            setEnteredValue('');
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