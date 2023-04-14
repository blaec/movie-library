import React from 'react';

import MySnackbar from "../UI/MySnackbar";
import Toolbar from "../component/Toolbar/Toolbar";
import {drawer, toolbarHeight} from "../utils/Constants";

import {makeStyles} from "@mui/styles";
import {Collapse, CssBaseline} from "@mui/material";
import {SnackbarProvider} from "notistack";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            marginTop: toolbarHeight.mobile,
            paddingLeft: drawer.width,
        },
        marginTop: toolbarHeight.desktop,
    }
}));

const layout = props => {
    const {children} = props;
    const {root} = useStyles();

    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            TransitionComponent={Collapse}
            autoHideDuration={3000}
        >
            <CssBaseline/>
            <Toolbar/>
            <MySnackbar/>
            <main className={root}>
                {children}
            </main>
        </SnackbarProvider>
    );
};

export default layout;