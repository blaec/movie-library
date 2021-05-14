import React from 'react';

import Search from "./Search";
import {drawer} from "../../../utils/Constants";

import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawer.width}px)`,
            marginLeft: drawer.width,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const myAppBar = (props) => {
    const {onDrawerToggle} = props;
    const {root, drawer, menuButton} = useStyles();

    return (
        <AppBar
            position="fixed"
            className={drawer}
        >
            <Toolbar className={root}>
                <IconButton
                    className={menuButton}
                    color="inherit"
                    edge="start"
                    onClick={onDrawerToggle}
                >
                    <MenuIcon/>
                </IconButton>
                <Search/>
            </Toolbar>
        </AppBar>
    );
};

export default myAppBar;