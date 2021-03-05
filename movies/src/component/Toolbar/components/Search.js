import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import {IconButton, InputAdornment, InputBase, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../../store/actions";
import ClearIcon from "@material-ui/icons/Clear";

const search = (props) => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);

    const onSearchChange = (searchString) => dispatch(actions.changeSearch(searchString));

    const endAdornment = () => {
        return !search
            ? ""
            : (
                <InputAdornment position="end">
                    <IconButton onClick={() => onSearchChange('')}>
                        <ClearIcon fontSize="small"/>
                    </IconButton>
                </InputAdornment>
            );
    };

    return (
        <div className={props.classes.search}>
            <div className={props.classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search..."
                onChange={event => onSearchChange(event.target.value)}
                classes={{
                    root: props.classes.inputRoot,
                    input: props.classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                value={search}
                endAdornment={endAdornment()}
            />
        </div>
    );
};

export default search;