import React from 'react';
import {useLocation} from "react-router";

import Search from "./Search";
import {drawer} from "../../../utils/Constants";
import {isSearchable} from "../../../utils/UrlUtils";

import {AppBar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: visible => {
        const justifyContent = visible ? 'flex-end' : 'flex-start';
        return {
            display: 'flex',
            justifyContent,
        };
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
    const {pathname} = useLocation();
    const {root, drawer, menuButton} = useStyles(isSearchable(pathname));

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