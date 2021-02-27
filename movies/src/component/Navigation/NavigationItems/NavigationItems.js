import React from 'react';
import './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";

const navigationItems = () => (
    <List>
        <ListItem button>
            <ListItemIcon><MovieFilterTwoToneIcon /></ListItemIcon>
            <ListItemText primary={<NavigationItem link="/" exact>Gallery</NavigationItem>} />
        </ListItem>
        <ListItem button>
            <ListItemIcon><UpdateTwoToneIcon /></ListItemIcon>
            <ListItemText primary={<NavigationItem link="/update" exact>Update</NavigationItem>} />
        </ListItem>
    </List>
);

export default navigationItems;
