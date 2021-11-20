import React from 'react';

import {Button} from "@material-ui/core";

const myDialogButton = (props) => {
    const {type, caption, disabled, onClick} = props;

    const style = {
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
        <Button
            color={style[type].color}
            autoFocus={style[type].autoFocus}
            onClick={onClick}
            disabled={disabled}
        >
            {caption}
        </Button>
    );
};

export default myDialogButton;