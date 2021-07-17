import React from 'react';
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {scrollPosition} from "../../../../store/localStorage/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'none',
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        zIndex: '99',
    },
}));

const scrollToTopButton = () => {
    const {root} = useStyles();

    const handleOnTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    return (
        <div>
            <Button
                className={root}
                color='primary'
                variant='contained'
                onClick={handleOnTop}
            >
                Scroll To Top
            </Button>
        </div>
    );
};

export default scrollToTopButton;