import React from 'react';
import {useLocation} from "react-router";

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {Divider, List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import MovieCreationTwoToneIcon from '@material-ui/icons/MovieCreationTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import HourglassFullTwoToneIcon from '@material-ui/icons/HourglassFullTwoTone';
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';

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
        text: "New Movies",
        link: reactLinks.newMovies,
        icon: <MovieCreationTwoToneIcon/>
    },
    {
        text: "Filter",
        link: reactLinks.filter,
        icon: <SearchTwoToneIcon/>
    },
    {
        text: "Wishlist",
        link: reactLinks.wishlist,
        icon: <FavoriteTwoToneIcon/>
    },
];
const infoItemsData = [
    {
        text: "Now Playing",
        link: reactLinks.nowPlaying,
        icon: <PlayCircleFilledWhiteTwoToneIcon/>
    },
    {
        text: "Anticipated",
        link: reactLinks.anticipated,
        icon: <HourglassFullTwoToneIcon/>
    },
];
const settingsItemsData = [
    {
        text: "Upload",
        link: reactLinks.upload,
        icon: <PublishTwoToneIcon/>
    },
    {
        text: "Library",
        link: reactLinks.library,
        icon: <StorageTwoToneIcon/>
    },
    {
        text: "Stats",
        link: reactLinks.stats,
        icon: <SaveTwoToneIcon/>
    },
];

const movieMenu = () => {
    const {pathname} = useLocation();

    return (
        <List>
            {getMenuItemsBlock(mainItemsData, pathname)}
            <Divider/>
            {getMenuItemsBlock(infoItemsData, pathname)}
            <Divider/>
            {getMenuItemsBlock(settingsItemsData, pathname)}
        </List>
    )
};

export default movieMenu;
