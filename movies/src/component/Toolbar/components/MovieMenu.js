import React, {useState} from 'react';

import MyListItem from "../../../UI/MyListItem";

import {List} from "@material-ui/core";
import MovieFilterTwoToneIcon from "@material-ui/icons/MovieFilterTwoTone";
import CardGiftcardTwoToneIcon from '@material-ui/icons/CardGiftcardTwoTone';
import UpdateTwoToneIcon from "@material-ui/icons/UpdateTwoTone";

const movieMenu = () => {
    const [selectedCaption, setSelectedCaption] = useState("Gallery");

    const handleListItemClick = (index) => {
        setSelectedCaption(index);
    };

    return (
        <List>
            <MyListItem selected={selectedCaption}
                        clicked={handleListItemClick}
                        link="/"
                        caption="Gallery"
                        icon={<MovieFilterTwoToneIcon/>}
            />
            <MyListItem selected={selectedCaption}
                        clicked={handleListItemClick}
                        link="/wishlist"
                        caption="Wishlist"
                        icon={<CardGiftcardTwoToneIcon/>}
            />
            <MyListItem selected={selectedCaption}
                        clicked={handleListItemClick}
                        link="/update"
                        caption="Update"
                        icon={<UpdateTwoToneIcon/>}
            />
        </List>
    )
};

export default movieMenu;
