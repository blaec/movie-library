import React from 'react';

import {makeStyles} from "@mui/styles";
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

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

const myControlIcon = (props) => {
    const {isInCollection, canDisplay, onAddToWatch, onDelete} = props;
    const {root} = useStyles(isInCollection);

    const iconButton = isInCollection
        ? <DeleteTwoToneIcon
            className={root}
            fontSize="large"
            onClick={onDelete}/>
        : <FavoriteTwoToneIcon
            className={root}
            fontSize="large"
            onClick={onAddToWatch}/>;

    return (
        <React.Fragment>
            {canDisplay && iconButton}
        </React.Fragment>
    );
};

export default myControlIcon;