import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

import {filterActions} from "../../../store/state/filter/filter-slice";
import {isSearchable} from "../../../utils/UrlUtils";
import {delay} from "../../../utils/Constants";

import {fade, IconButton, InputAdornment, InputBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    root: visible => {
        const display = visible ? null : 'none';
        return {
            display,
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        };
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const search = () => {
    const {pathname} = useLocation();
    const {root, searchIcon, inputRoot, inputInput} = useStyles(isSearchable(pathname))
    const [searchTerm, setSearchTerm] = useState('');
    const {t} = useTranslation('common');

    const {hasSearch} = useSelector(state => state.filter.search);
    const dispatch = useDispatch();
    const onSearchChange = (searchString) => dispatch(filterActions.changeSearch(searchString));

    useEffect(() => {
        const identifier = setTimeout(() => {
            onSearchChange(searchTerm);
        }, delay.search)

        return () => clearTimeout(identifier)
    }, [searchTerm])


    let endAdornment = () => '';
    if (hasSearch) {
        endAdornment = () =>
            <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm('')}>
                    <ClearIcon fontSize="small"/>
                </IconButton>
            </InputAdornment>;
    }

    return (
        <div className={root}>
            <div className={searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder={t('text.search')}
                onChange={event => setSearchTerm(event.target.value)}
                classes={{
                    root: inputRoot,
                    input: inputInput,
                }}
                value={searchTerm}
                endAdornment={endAdornment()}
            />
        </div>
    );
};

export default search;