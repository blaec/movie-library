import React from 'react';

import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        padding: '5px',
        color: 'red',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: '50%',
        zIndex: 1,
    }
}));

const myDelete = (props) => {
    const {onDelete} = props;
    const {root} = useStyles();

    return (
        <DeleteTwoToneIcon className={root}
                           fontSize="large"
                           onClick={onDelete}/>
    );
};

export default myDelete;