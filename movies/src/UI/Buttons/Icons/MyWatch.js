import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '5px',
        right: '50px',
        padding: '5px',
        color: 'green',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 1,
    }
}));

const myWatch = (props) => {
    const {onAddToWatch} = props;
    const {root} = useStyles();

    return (
        <VisibilityTwoToneIcon
            className={root}
            fontSize="large"
            onClick={onAddToWatch}/>
    );
};

export default myWatch;