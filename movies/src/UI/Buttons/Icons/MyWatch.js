import React from 'react';

import {makeStyles} from "@material-ui/core/styles";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

const useStyles = makeStyles((theme) => ({
    root: isInCollection => {
        let color = isInCollection ? 'red' : 'green';
        return {
            position: 'absolute',
            top: '5px',
            right: '5px',
            padding: '5px',
            color,
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 1,
        };
    }
}));

const myWatch = (props) => {
    const {isInCollection, onAddToWatch} = props;
    const {root} = useStyles(isInCollection);

    return (
        <React.Fragment>
            {!isInCollection && <FavoriteTwoToneIcon
                className={root}
                fontSize="large"
                onClick={onAddToWatch}/>}
            {isInCollection && <DeleteTwoToneIcon
                className={root}
                fontSize="large"
                onClick={onAddToWatch}/>}
        </React.Fragment>
    );
};

export default myWatch;