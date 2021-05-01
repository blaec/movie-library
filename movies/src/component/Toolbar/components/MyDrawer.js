import React from 'react';

import MovieMenu from "./MovieMenu";
import {drawer} from "../../../utils/Constants";
import Logo from "./Logo";

import {Divider, Drawer, Hidden} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    drawerShrink: {
        [theme.breakpoints.up('sm')]: {
            width: drawer.width,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawer.width,
    }
}));


const myDrawer = (props) => {
    const {open, onDrawerToggle} = props;
    const {drawerShrink, toolbar, drawerPaper} = useStyles();

    const drawer = (
        <div>
            <Logo/>
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