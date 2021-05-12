import React from 'react';

import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const myTextField = (props) => {
    const {id, inputRef, text, disabled, label, helperText, required, onChangeTextField} = props;

    let adornment = null;
    if (text.length > 0) {
        adornment = {
            endAdornment:
                <InputAdornment position="end">
                    <IconButton onClick={() => onChangeTextField('', id)}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                </InputAdornment>
        }
    }

    // TODO check unused props, like id
    return (
        <TextField id={id}
                   value={text}
                   inputRef={inputRef}
                   disabled={disabled}
                   label={label}
                   style={{margin: 8}}
                   helperText={helperText}
                   fullWidth
                   margin="normal"
                   required={required}
                   onChange={event => onChangeTextField(event.target.value, id)}
                   InputProps={adornment}
        />
    );
};

export default myTextField;