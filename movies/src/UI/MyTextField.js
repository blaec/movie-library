import React from 'react';

import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const myTextField = (props) => {
    const {id, text, disabled, label, helperText, onChangeTextField} = props;

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

    return (
        <TextField id={id}
                   value={text}
                   disabled={disabled}
                   label={label}
                   style={{margin: 8}}
                   helperText={helperText}
                   fullWidth
                   margin="normal"
                   onChange={event => onChangeTextField(event.target.value, id)}
                   InputProps={adornment}
        />
    );
};

export default myTextField;