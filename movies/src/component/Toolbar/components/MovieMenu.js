import React from 'react';
import {useLocation} from "react-router";
import {useTranslation} from "react-i18next";

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {Divider, List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import MovieCreationTwoToneIcon from '@material-ui/icons/MovieCreationTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import HourglassFullTwoToneIcon from '@material-ui/icons/HourglassFullTwoTone';
import StorageTwoToneIcon from '@material-ui/icons/StorageTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import FiberNewIcon from '@material-ui/icons/FiberNew';

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
        text: "menu.addNew",
        link: reactLinks.addNew,
        icon: <FiberNewIcon/>
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
