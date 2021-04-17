import React from 'react';

import {Button} from "@material-ui/core";

const myDialogButton = (props) => {
    let {type, caption, onClick} = props;
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
        <Button color={style[type].color}
                autoFocus={style[type].autoFocus}
                onClick={onClick}
        >
            {caption}
        </Button>
    );
};

export default myDialogButton;