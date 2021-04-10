import React from 'react';
import {Button} from "@material-ui/core";

const mySubmitButton = (props) => {
    let {disabled, icon, submit, caption, type, fill} = props;
    type = type === undefined ? "success" : type;
    const colorStyle = {
        success: {color: "primary"},
        danger: {color: "secondary"}
    };
    fill = fill === undefined ? "empty" : fill;
    const fillStyle = {
        filled: {variant: "contained"},
        empty: {variant: "outlined"}
    }

    return (
        <Button variant={fillStyle[fill].variant}
                disabled={disabled}
                color={colorStyle[type].color}
                startIcon={icon}
                onClick={submit}>
            {caption}
        </Button>
    );
};

export default mySubmitButton;