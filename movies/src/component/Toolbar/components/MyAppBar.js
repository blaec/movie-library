import React from 'react';

import Search from "./Search";
import {drawer} from "../../../utils/Constants";

import {AppBar, IconButton, Toolbar} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const _iconButton = {
    mr: 2,
    display: {sm: 'none'}
};
const _appBar = {
    width: {sm: `calc(100% - ${drawer.width}px)`},
    ml: {sm: `${drawer.width}px`},
    zIndex: (theme) => theme.zIndex.drawer + 1,
};
const _search = {
    display: 'flex',
    justifyContent:  {
        sm: 'flex-start',
        md: 'flex-end'
    }
};


const myAppBar = (props) => {
    const {onDrawerToggle} = props;


    return (
        <AppBar
            position="fixed"
            sx={_appBar}
        >
            <Toolbar sx={_search}>
                <IconButton
                    sx={_iconButton}
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