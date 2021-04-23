import React from 'react';

import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: buttonStyles => {
        const {marginRight} = buttonStyles;
        return {
            marginRight: theme.spacing(marginRight || 0),
        };
    },
}));

const mySubmitButton = (props) => {
    let {disabled, icon, caption, type, fill, buttonStyles, onSubmit} = props;
    const classes = useStyles(buttonStyles);

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
        <Button className={classes.root}
                variant={fillStyle[fill].variant}
                disabled={disabled}
                color={colorStyle[type].color}
                startIcon={icon}
                onClick={onSubmit}
        >
            {caption}
        </Button>
    );
};

export default mySubmitButton;