import React from 'react';

import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: disabled => {
        const opacity = disabled ? '33%' : '100%';
        const pointerEvents = disabled ? 'none' : null;
        return {
            pointerEvents,
            opacity,
            position: 'absolute',
            top: '5px',
            right: '5px',
            padding: '5px',
            color: 'red',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1,
        }
    }
}));

const myDelete = (props) => {
    const {disabled, onDelete} = props;
    const {root} = useStyles(disabled);

    return (
        <DeleteTwoToneIcon
            className={root}
            fontSize="large"
            onClick={onDelete}/>
    );
};

export default myDelete;