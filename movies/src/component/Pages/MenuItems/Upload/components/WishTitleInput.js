import React, {useState} from 'react';
import MyTextField from "../../../../../UI/MyTextField";

const wishTitleInput = (props) => {
    const {inputRef, onDisable} = props;
    const [wishTitle, setWishTitle] = useState('');

    const handleTextFieldChange = (text) => {
        setWishTitle(text);
        onDisable(text.length === 0);
    };

    return (
        <MyTextField
            text={wishTitle}
            label="Movie title"
            helperText="Enter movie title"
            inputRef={inputRef}
            required={true}
            onChangeTextField={handleTextFieldChange}
        />
    );
};

export default wishTitleInput;