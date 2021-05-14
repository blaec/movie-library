import React from 'react';

import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const myTextField = (props) => {
    const {inputRef, text, disabled, label, helperText, required, onChangeTextField} = props;

    let adornment = null;
    if (text.length > 0) {
        adornment = {
            endAdornment:
                <InputAdornment position="end">
                    <IconButton onClick={() => onChangeTextField('')}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                </InputAdornment>
        }
    }

    return (
        <TextField
            value={text}
            inputRef={inputRef}
            disabled={disabled}
            label={label}
            style={{margin: 8}}
            helperText={helperText}
            fullWidth
            margin="normal"
            required={required}
            onChange={event => onChangeTextField(event.target.value)}
            InputProps={adornment}
        />
    );
};

export default myTextField;