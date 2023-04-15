import React from 'react';
import {NavLink} from "react-router-dom";

import {stripString} from "../utils/Utils";

import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";


const myListItem = (props) => {
    const {path, caption, link, icon} = props;

    const isSelected = stripString(path).includes(stripString(link));
    const activeColor = isSelected ? {color: 'primary.main'} : null;

    return (
        <ListItemButton
            selected={isSelected}
            component={NavLink}
            to={link}
        >
            <ListItemIcon sx={activeColor}>
                {icon}
            </ListItemIcon>
            <ListItemText
                sx={activeColor}
                primary={caption}
            />
        </ListItemButton>
    );
};

export default myListItem;