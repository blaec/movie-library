import React from 'react';
import {Button} from "@material-ui/core";

const myDialogButton = (props) => {
    const type = {
        success: {
            color: "primary",
            autoFocus: true
        },
        danger: {
            color: "secondary",
            autoFocus: false
        }
    };

    return (
        <Button onClick={props.clicked}
                color={type[props.type].color}
                autoFocus={type[props.type].autoFocus}
        >
            {props.caption}
        </Button>
    );
};

export default myDialogButton;