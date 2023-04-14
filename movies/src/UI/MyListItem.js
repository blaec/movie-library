import React from 'react';
import {NavLink} from "react-router-dom";

import {stripString} from "../utils/Utils";

import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    active: {
        color: '#3f51b5',
    },
}));

const myListItem = (props) => {
    const {path, caption, link, icon} = props;
    const {active} = useStyles();

    const isSelected = stripString(path).includes(stripString(link));
    const activeColor = isSelected
        ? active
        : null;

    return (
        <ListItem
            button
            selected={isSelected}
            component={NavLink} to={link}
        >
            <ListItemIcon className={activeColor}>
                {icon}
            </ListItemIcon>
            <ListItemText
                primary={caption}
                className={activeColor}
            />
        </ListItem>
    );
};

export default myListItem;