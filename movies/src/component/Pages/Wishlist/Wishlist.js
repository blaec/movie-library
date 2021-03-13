import React, {useEffect, useState} from 'react';
import Gallery from "../../Gallery/Gallery/Gallery";

const wishlist = () => {
    return (
        <Gallery url="/movies/wishlist"/>
    );
};

export default wishlist;