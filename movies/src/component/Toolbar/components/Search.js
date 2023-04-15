import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

import {filterActions} from "../../../store/state/filter/filter-slice";
import {isSearchable} from "../../../utils/UrlUtils";
import {delay} from "../../../utils/Constants";

import {alpha, IconButton, InputAdornment, InputBase, styled} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
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
    const [searchTerm, setSearchTerm] = useState('');
    const {t} = useTranslation('common');

    const {hasSearch} = useSelector(state => state.filter.search);
    const onSearchChange = (searchString) => dispatch(filterActions.changeSearch(searchString));

    const dispatch = useDispatch();

    let _hidden = isSearchable(pathname)
        ? null
        : {display:'none'};

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
        <Search sx={_hidden}>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={t('text.search')}
                onChange={event => setSearchTerm(event.target.value)}
                value={searchTerm}
                endAdornment={endAdornment()}
            />
        </Search>
    );
};

export default search;