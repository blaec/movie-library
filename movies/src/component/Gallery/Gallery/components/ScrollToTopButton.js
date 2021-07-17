import React from 'react';
import {Button, IconButton, useScrollTrigger, Zoom} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import ExpandLessIcon from '@material-ui/icons/ExpandLess';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function scrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

// const useStyles = makeStyles((theme) => ({
//     button: {
//         // display: 'none',
//         position: 'fixed',
//         bottom: '20px',
//         right: '20px',
//         zIndex: '99',
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         color: theme.palette.primary.main,
//         "&:hover": {
//             "& .MuiSvgIcon-root":{
//                 color: theme.palette.primary.light,
//                 backgroundColor: 'rgba(255,255,255,0.7)',
//             }
//         },
//     },
// }));
//
// const scrollToTopButton = () => {
//     const {button} = useStyles();
//
//     const handleOnTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     };
//
//
//     return (
//         <div>
//             <IconButton
//                 className={button}
//                 color='primary'
//                 onClick={handleOnTop}
//             >
//                 <ExpandLessIcon/>
//             </IconButton>
//         </div>
//     );
// };

export default scrollTop;