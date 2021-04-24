import React from 'react';

import MovieMenu from "./MovieMenu";
import {DRAWER_WIDTH} from "../../../utils/Constants";

import {Divider, Drawer, Hidden} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    drawerShrink: {
        [theme.breakpoints.up('sm')]: {
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: DRAWER_WIDTH,
    }
}));


const myDrawer = (props) => {
    const {open, onDrawerToggle} = props;
    const {drawerShrink, toolbar, drawerPaper} = useStyles();
    const theme = useTheme();

    const drawer = (
        <div>
            <div className={toolbar}/>
            <Divider/>
            <MovieMenu/>
        </div>
    );

    return (
        <nav className={drawerShrink}>
            <Hidden smUp implementation="css">
                <Drawer
                    classes={{
                        paper: drawerPaper,
                    }}
                    variant="temporary"
                    open={open}
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    onClick={onDrawerToggle}
                    onClose={onDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
};

export default myDrawer;