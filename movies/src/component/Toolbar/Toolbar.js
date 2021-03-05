import React, {useState} from 'react';

import MovieMenu from "./components/MovieMenu";
import MyAppBar from "./components/MyAppBar";
import './Toolbar.css'

import {CssBaseline, Divider, Drawer, fade, Hidden} from "@material-ui/core";
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {DRAWER_WIDTH} from "../../utils/Constants";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));

const toolbar = props => {
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMobileMenuClose = () => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    }

    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <Divider/>
            <MovieMenu clicked={handleMobileMenuClose}/>
        </div>
    );

    const container = window !== undefined
        ? () => window().document.body
        : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <MyAppBar classes={classes}
                      toggle={handleDrawerToggle}
            />
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="temporary"
                        open={mobileOpen}
                        container={container}
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        onClose={handleDrawerToggle}
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
        </div>
    );
};

export default toolbar;
