import React from 'react';

import MySnackbar from "../UI/MySnackbar";
import Toolbar from "../component/Toolbar/Toolbar";
import {DRAWER_WIDTH} from "../utils/Constants";

import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
            paddingLeft: DRAWER_WIDTH,
        },
        marginTop: 56,
    }
}));

const layout = props => {
    const {children} = props;
    const {root} = useStyle();

    return (
        <React.Fragment>
            <Toolbar />
            <MySnackbar/>
            <main className={root}>
                {children}
            </main>
        </React.Fragment>
    );
};

export default layout;