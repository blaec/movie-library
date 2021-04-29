import React from 'react';

import Search from "./Search";
import {DRAWER_WIDTH} from "../../../utils/Constants";
import Logo from "./Logo";

import {AppBar, Box, Icon, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${DRAWER_WIDTH}px)`,
            marginLeft: DRAWER_WIDTH,
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
        <AppBar position="fixed" className={drawer}>
            <Toolbar className={root}>
                <IconButton className={menuButton}
                            color="inherit"
                            edge="start"
                            onClick={onDrawerToggle}>
                    <MenuIcon/>
                </IconButton>
                <Logo/>
                <Search/>
            </Toolbar>
        </AppBar>
    );
};

export default myAppBar;