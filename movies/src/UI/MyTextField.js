import React from 'react';
import {TextField} from "@material-ui/core";

const myTextField = (props) => {
    return (
        <TextField id={props.id}
                   disabled={props.disabled}
                   label={props.label}
                   style={{margin: 8}}
                   helperText={props.helperText}
                   fullWidth
                   margin="normal"
                   onChange={props.onChangeTextField}
        />
    );
};

export default myTextField;