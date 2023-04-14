import React from 'react';

import ImageTwoToneIcon from '@mui/icons-material/ImageTwoTone';

import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        [theme.breakpoints.up('sm')]: {
            bottom: '45px',
        },
        bottom: '40px',
        right: '5px',
        padding: '5px',
        color: 'darkcyan',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 1,
    }
}));

const myPosterIcon = (props) => {
    const {isInCollection, onShowModal} = props;
    const {root} = useStyles();

    return (
        <React.Fragment>
            {isInCollection
            && <ImageTwoToneIcon
                    className={root}
                    fontSize="large"
                    onClick={onShowModal}/>}
        </React.Fragment>
    );
};

export default myPosterIcon;