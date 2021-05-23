import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isEmpty} from "../../../../utils/Utils";

const wishlist = () => {
    const wishMovies = useSelector(state => state.collection.wishlist);
    const isLoading = isEmpty(wishMovies);

    return (
        <React.Fragment>
            {isLoading && <MyLoader/>}
            {!isLoading && <Gallery movies={wishMovies}/>}
        </React.Fragment>
    );
};

export default wishlist;