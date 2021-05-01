import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import * as actions from "../../../store/actions";

import {fade, IconButton, InputAdornment, InputBase} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    root: {
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
    const {root, searchIcon, inputRoot, inputInput} = useStyles();
    const search = useSelector(state => state.search);
    const dispatch = useDispatch();
    const onSearchChange = (searchString) => dispatch(actions.changeSearch(searchString));

    let endAdornment = () => '';
    if (search) {
        endAdornment = () =>
            <InputAdornment position="end">
                <IconButton onClick={() => onSearchChange('')}>
                    <ClearIcon fontSize="small"/>
                </IconButton>
            </InputAdornment>;
    }

    return (
        <div className={root}>
            <div className={searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase placeholder="Search..."
                       onChange={event => onSearchChange(event.target.value)}
                       classes={{
                           root: inputRoot,
                           input: inputInput,
                       }}
                       value={search}
                       endAdornment={endAdornment()}
            />
        </div>
    );
};

export default search;