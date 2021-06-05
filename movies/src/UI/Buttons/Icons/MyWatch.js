import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

const useStyles = makeStyles((theme) => ({
    root: disabled => {
        const opacity = disabled ? '33%' : '100%';
        const pointerEvents = disabled ? 'none' : null;
        return {
            pointerEvents,
            opacity,
            position: 'absolute',
            top: '5px',
            right: '60px',
            padding: '5px',
            color: 'green',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1,
        };
    }
}));

const myWatch = (props) => {
    const {disabled, onAddToWatch} = props;
    const {root} = useStyles(disabled);

    return (
        <FavoriteTwoToneIcon
            className={root}
            fontSize="large"
            onClick={onAddToWatch}/>
    );
};

export default myWatch;