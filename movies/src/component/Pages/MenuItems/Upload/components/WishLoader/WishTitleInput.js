import React, {useState} from 'react';

import MyTextField from "../../../../../../UI/MyTextField";

const wishTitleInput = (props) => {
    const {inputRef, onSearchDisable} = props;

    const [wishTitle, setWishTitle] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const validityCheck = (text) => isTouched && text.length === 0;

    let isNotValid = validityCheck(wishTitle);
    const handleTextFieldChange = (text) => {
        setWishTitle(text);
        onSearchDisable(validityCheck(text));
    };

    const handleFieldTouch = () => {
        setIsTouched(true);
    };

    return (
        <MyTextField
            isNotValid={isNotValid}
            text={wishTitle}
            label="Movie title"
            helperText="Enter movie title"
            inputRef={inputRef}
            required={true}
            onChangeTextField={handleTextFieldChange}
            onInputTouch={handleFieldTouch}
        />
    );
};

export default wishTitleInput;