import React, {useState} from 'react';

import MyAppBar from "./components/MyAppBar";
import MyDrawer from "./components/MyDrawer";

import {CssBaseline} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}));

const toolbar = props => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMobileMenuClose = () => {
        if (mobileOpen) {
            setMobileOpen(false);
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <MyAppBar classes={classes}
                      toggle={handleDrawerToggle}
            />
            <MyDrawer {...props}
                      mobileClose={handleMobileMenuClose}
                      drawerToggle={handleDrawerToggle}
                      open={mobileOpen}
            />
        </div>
    );
}

export default toolbar;
