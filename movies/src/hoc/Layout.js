import React from 'react';

import MySnackbar from "../UI/MySnackbar";
import Toolbar from "../component/Toolbar/Toolbar";
import {drawer, toolbarHeight} from "../utils/Constants";

import {makeStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
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
    const {root} = useStyle();

    return (
        <React.Fragment>
            <CssBaseline/>
            <Toolbar />
            <MySnackbar />
            <main className={root}>
                {children}
            </main>
        </React.Fragment>
    );
};

export default layout;