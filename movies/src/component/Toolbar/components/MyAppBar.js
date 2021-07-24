import React, {useState} from 'react';
import {useLocation} from "react-router";

import Search from "./Search";
import {drawer} from "../../../utils/Constants";
import {isSearchable} from "../../../utils/UrlUtils";

import {AppBar, Button, IconButton, Toolbar} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    root: visible => {
        const justifyContent = visible ? 'flex-end' : 'flex-start';
        return {
            display: 'flex',
            justifyContent,
        };
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawer.width}px)`,
            marginLeft: drawer.width,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

const myAppBar = (props) => {
    const {onDrawerToggle} = props;
    const {pathname} = useLocation();
    const {root, drawer, menuButton} = useStyles(isSearchable(pathname));
    const [lang, setLang] = useState('EN');
    const [t, i18n] = useTranslation('common');

    const handleChangeLanguage = () => {
        switch (i18n.language) {
            case 'ru':
                setLang('EN');
                i18n.changeLanguage('en');
                break;
            case 'en':
                setLang('RU');
                i18n.changeLanguage('ru');
                break;
            default:
                console.log("error");
        }
    };

    console.log(lang);

    return (
        <AppBar
            position="fixed"
            className={drawer}
        >
            <Toolbar className={root}>
                <IconButton
                    className={menuButton}
                    color="inherit"
                    edge="start"
                    onClick={onDrawerToggle}
                >
                    <MenuIcon/>
                </IconButton>
                <Search/>
                <Button variant='contained' color='secondary' onClick={handleChangeLanguage}>{lang}</Button>
            </Toolbar>
        </AppBar>
    );
};

export default myAppBar;