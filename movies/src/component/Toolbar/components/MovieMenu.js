import React, {useState} from 'react';

import MyListItem from "../../../UI/MyListItem";
import {reactLinks} from "../../../utils/UrlUtils";

import {List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

const menuItemsData = {
    "Collection": {
        link: reactLinks.home,
        icon: <MovieFilterTwoToneIcon/>
    },
    "Wishlist": {
        link: reactLinks.wishlist,
        icon: <FavoriteTwoToneIcon/>
    },
    "Filter": {
        link: reactLinks.filter,
        icon: <SearchTwoToneIcon/>
    },
    "Upload": {
        link: reactLinks.upload,
        icon: <UpdateTwoToneIcon/>
    },
};

const movieMenu = () => {
    const [selectedCaption, setSelectedCaption] = useState("Gallery");

    const handleListItemClick = (index) => {
        setSelectedCaption(index);
    };

    const menuItems = Object.keys(menuItemsData).map(inputKey =>
        <MyListItem key={inputKey}
                    caption={inputKey}
                    link={menuItemsData[inputKey].link}
                    icon={menuItemsData[inputKey].icon}
                    selected={selectedCaption}
                    onClick={handleListItemClick}
        />
    );

    return (
        <List>
            {menuItems}
        </List>
    )
};

export default movieMenu;
