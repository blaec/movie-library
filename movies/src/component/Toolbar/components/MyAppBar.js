import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../../../store/actions";
import Search from "./Search";

import {AppBar, IconButton, InputAdornment, InputBase, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const myAppBar = (props) => {
    return (
        <AppBar position="fixed" className={props.classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.toggle}
                    className={props.classes.menuButton}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography className={props.classes.title} variant="h6" noWrap>
                    MOVIE-LIBRARY
                </Typography>
                <Search classes={props.classes}/>
            </Toolbar>
        </AppBar>
    );
};

export default myAppBar;