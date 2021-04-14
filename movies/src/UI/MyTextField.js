import React, {useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const myTextField = (props) => {
    const {id, text, disabled, label, helperText, onChangeTextField} = props;

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
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end">
                               <IconButton onClick={() => onChangeTextField('', id)}>
                                   <ClearIcon fontSize="small"/>
                               </IconButton>
                           </InputAdornment>
                       )
                   }}
        />
    );
};

export default myTextField;