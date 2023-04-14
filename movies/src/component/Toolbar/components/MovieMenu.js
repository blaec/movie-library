import React from 'react';
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {Divider, List} from "@mui/material";
import MovieFilterTwoToneIcon from "@mui/icons-material/MovieFilterTwoTone";
import MovieCreationTwoToneIcon from '@mui/icons-material/MovieCreationTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';

const getMenuItemsBlock = (itemsData, pathname) => {
    const {t} = useTranslation('common');

    return  itemsData.map((item, index) => {
            const {text, link, icon} = item;

            return (
                <MyListItem
                    key={index}
                    caption={t(text)}
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
        text: "menu.collection",
        link: reactLinks.collection,
        icon: <MovieFilterTwoToneIcon/>
    },
    {
        text: "menu.newMovies",
        link: reactLinks.newMovies,
        icon: <MovieCreationTwoToneIcon/>
    },
    {
        text: "menu.filter",
        link: reactLinks.filter,
        icon: <SearchTwoToneIcon/>
    },
    {
        text: "menu.wishlist",
        link: reactLinks.wishlist,
        icon: <FavoriteTwoToneIcon/>
    },
];
const infoItemsData = [
    {
        text: "menu.nowPlaying",
        link: reactLinks.nowPlaying,
        icon: <PlayCircleFilledWhiteTwoToneIcon/>
    },
    {
        text: "menu.anticipated",
        link: reactLinks.anticipated,
        icon: <HourglassFullTwoToneIcon/>
    },
    {
        text: "menu.topRated",
        link: reactLinks.topRated,
        icon: <TrendingUpTwoToneIcon/>
    },
];
const settingsItemsData = [
    {
        text: "menu.library",
        link: reactLinks.library,
        icon: <StorageTwoToneIcon/>
    },
    {
        text: "menu.settings",
        link: reactLinks.settings,
        icon: <SettingsIcon/>
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
