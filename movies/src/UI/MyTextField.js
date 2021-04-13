import React, {useState} from 'react';
import {InputAdornment, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const myTextField = (props) => {
    const {id, disabled, label, helperText, onChangeTextField} = props;
    const [text, setText] = useState();

    const handleClear = () => {
        setText('');
    };

    return (
        <TextField id={id}
                   disabled={disabled}
                   value={text}
                   label={label}
                   style={{margin: 8}}
                   helperText={helperText}
                   fullWidth
                   margin="normal"
                   onChange={onChangeTextField}
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end" onClick={() => handleClear()}>
                               <ClearIcon fontSize="small"/>
                           </InputAdornment>
                       )
                   }}
        />
    );
};

export default myTextField;