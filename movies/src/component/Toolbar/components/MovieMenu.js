import React, {useState} from 'react';

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

const movieMenu = () => {
    const [selectedCaption, setSelectedCaption] = useState("Gallery");

    const handleListItemClick = (index) => {
        setSelectedCaption(index);
    };

    return (
        <List>
            <MyListItem selected={selectedCaption}
                        link={reactLinks.home}
                        caption="Collection"
                        icon={<MovieFilterTwoToneIcon/>}
                        onClick={handleListItemClick}
            />
            <MyListItem selected={selectedCaption}
                        link={reactLinks.wishlist}
                        caption="Wishlist"
                        icon={<FavoriteTwoToneIcon/>}
                        onClick={handleListItemClick}
            />
            <MyListItem selected={selectedCaption}
                        link={reactLinks.filter}
                        caption="Filter"
                        icon={<SearchTwoToneIcon/>}
                        onClick={handleListItemClick}
            />
            <MyListItem selected={selectedCaption}
                        link={reactLinks.upload}
                        caption="Upload"
                        icon={<UpdateTwoToneIcon/>}
                        onClick={handleListItemClick}
            />
        </List>
    )
};

export default movieMenu;
