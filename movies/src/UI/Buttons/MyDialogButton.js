import React from 'react';

import {Button} from "@material-ui/core";

const myDialogButton = (props) => {
    let {clicked, type, caption} = props;
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
        <Button onClick={clicked}
                color={style[type].color}
                autoFocus={style[type].autoFocus}
        >
            {caption}
        </Button>
    );
};

export default myDialogButton;