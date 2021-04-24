import React from 'react';

import Search from "./Search";

import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "../../../utils/Constants";

const useStyles = makeStyles((theme) => ({
    appBar: {
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
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
}));

const myAppBar = (props) => {
    const {onDrawerToggle} = props;
    const {appBar, menuButton, title} = useStyles();

    return (
        <AppBar position="fixed" className={appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onDrawerToggle}
                    className={menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography className={title} variant="h6" noWrap>
                    MOVIE-LIBRARY
                </Typography>
                <Search/>
            </Toolbar>
        </AppBar>
    );
};

export default myAppBar;