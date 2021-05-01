import React, {useState} from 'react';

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

const menuItemsData = [
    {
        text: "Collection",
        link: reactLinks.home,
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
    {
        text: "Upload",
        link: reactLinks.upload,
        icon: <UpdateTwoToneIcon/>
    },
];

const movieMenu = () => {
    const [selectedCaption, setSelectedCaption] = useState("Gallery");

    const handleListItemClick = (index) => {
        setSelectedCaption(index);
    };

    const menuItems = menuItemsData.map((item, index) => {
            const {text, link, icon} = item;
            return <MyListItem key={index}
                               caption={text}
                               link={link}
                               icon={icon}
                               selected={selectedCaption}
                               onClick={handleListItemClick}
            />;
        }
    );

    return (
        <List>
            {menuItems}
        </List>
    )
};

export default movieMenu;
