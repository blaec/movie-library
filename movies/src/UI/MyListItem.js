import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const myListItem = (props) => {
    const {selected, caption, link, icon, onClick} = props;

    return (
        <ListItem button
                  selected={selected === caption}
                  component={NavLink} to={link}
                  onClick={() => onClick(caption)}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={caption}/>
        </ListItem>
    );
};

export default myListItem;