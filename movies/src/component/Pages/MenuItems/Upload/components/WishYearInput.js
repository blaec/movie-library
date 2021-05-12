import React, {useState} from 'react';
import MyTextField from "../../../../../UI/MyTextField";

const wishYearInput = (props) => {
    const {inputRef} = props;
    const [wishYear, setWishYear] = useState('');

    const handleTextFieldChange = (text) => {
        setWishYear(text);
    };

    return (
        <MyTextField text={wishYear}
                     label="Release year"
                     helperText="Enter movie release year"
                     inputRef={inputRef}
                     required={false}
                     onChangeTextField={handleTextFieldChange}
        />
    );
};

export default wishYearInput;