import React from 'react';
import {Button} from "@material-ui/core";

const mySubmitButton = (props) => {
    return (
        <Button variant="outlined"
                disabled={props.disabled}
                color="primary"
                startIcon={props.icon}
                onClick={props.submit}>
            {props.caption}
        </Button>
    );
};

export default mySubmitButton;