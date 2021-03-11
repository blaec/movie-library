import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const myListItem = (props) => {
    return (
        <ListItem button
                  selected={props.selected === props.caption}
                  onClick={() => props.clicked(props.caption)}
                  component={NavLink} to={props.link}
        >
            <ListItemIcon>{props.icon}</ListItemIcon>
            <ListItemText primary={props.caption}/>
        </ListItem>
    );
};

export default myListItem;