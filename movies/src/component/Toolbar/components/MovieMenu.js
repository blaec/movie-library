import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";

const movieMenu = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <List>
            <ListItem button
                      selected={selectedIndex === 0}
                      onClick={(event) => handleListItemClick(event, 0)}
                      component={NavLink} to="/"
            >
                <ListItemIcon><MovieFilterTwoToneIcon/></ListItemIcon>
                <ListItemText primary="Gallery"/>
            </ListItem>
            <ListItem button
                      selected={selectedIndex === 1}
                      onClick={(event) => handleListItemClick(event, 1)}
                      component={NavLink} to="/update"
            >
                <ListItemIcon><UpdateTwoToneIcon/></ListItemIcon>
                <ListItemText primary="Update"/>
            </ListItem>
        </List>
    )
};

export default movieMenu;
