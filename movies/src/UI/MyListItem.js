import React from 'react';
import {NavLink} from "react-router-dom";

import {stripString} from "../utils/Utils";

import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    active: {
        color: '#3f51b5',
    },
}));

const myListItem = (props) => {
    const {path, caption, link, icon} = props;
    const {active} = useStyles();

    const isSelected = stripString(path).includes(stripString(caption));

    return (
        <ListItem
            button
            selected={isSelected}
            component={NavLink} to={link} activeClassName={active}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={caption}/>
        </ListItem>
    );
};

export default myListItem;