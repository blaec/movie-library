import React from 'react';
import {NavLink} from "react-router-dom";

import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    active: {
        color: '#3f51b5',
    },
}));

const myListItem = (props) => {
    console.log(props);
    const {selected, caption, link, icon, onClick} = props;
    const {active} = useStyles();

    return (
        <ListItem
            button
            selected={selected === caption}
            component={NavLink} to={link} activeClassName={active}
            onClick={() => onClick(caption)}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={caption}/>
        </ListItem>
    );
};

export default myListItem;