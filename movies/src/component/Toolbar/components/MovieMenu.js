import React from 'react';
import {useLocation} from "react-router";

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {Divider, List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';

const getMenuItemsBlock = (itemsData, pathname) => {
    return  itemsData.map((item, index) => {
            const {text, link, icon} = item;
            return (
                <MyListItem
                    key={index}
                    caption={text}
                    link={link}
                    icon={icon}
                    path={pathname}
                />
            );
        }
    );
}

const mainItemsData = [
    {
        text: "Collection",
        link: reactLinks.collection,
        icon: <MovieFilterTwoToneIcon/>
    },
    {
        text: "Wishlist",
        link: reactLinks.wishlist,
        icon: <FavoriteTwoToneIcon/>
    },
    {
        text: "Filter",
        link: reactLinks.filter,
        icon: <SearchTwoToneIcon/>
    },
];
const settingsItemsData = [
    {
        text: "Upload",
        link: reactLinks.upload,
        icon: <UpdateTwoToneIcon/>
    },
];
const newsItemsData = [
    {
        text: "Now Playing",
        link: reactLinks.upload,
        icon: <PlayCircleFilledWhiteTwoToneIcon/>
    },
];

const movieMenu = () => {
    const {pathname} = useLocation();

    return (
        <List>
            {getMenuItemsBlock(mainItemsData, pathname)}
            <Divider/>
            {getMenuItemsBlock(settingsItemsData, pathname)}
            <Divider/>
            {getMenuItemsBlock(newsItemsData, pathname)}
        </List>
    )
};

export default movieMenu;
