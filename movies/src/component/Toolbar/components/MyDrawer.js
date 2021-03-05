import React from 'react';

import MovieMenu from "./MovieMenu";
import {DRAWER_WIDTH} from "../../../utils/Constants";

import {Divider, Drawer, Hidden} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    drawer: {
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
    const classes = useStyles();
    const theme = useTheme();
    const {window} = props;

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <MovieMenu/>
        </div>
    );

    const container = window !== undefined
        ? () => window().document.body
        : undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="temporary"
                    open={props.open}
                    container={container}
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    onClick={props.drawerToggle}
                    onClose={props.drawerToggle}
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
                        paper: classes.drawerPaper,
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