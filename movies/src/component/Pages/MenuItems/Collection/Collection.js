import React from 'react';
import {useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isEmpty} from "../../../../utils/Utils";

const collection = () => {
    const movies = useSelector(state => state.collection.movies);
    const isLoading = isEmpty(movies);

    return (
        <React.Fragment>
            {isLoading && <MyLoader/>}
            {!isLoading && <Gallery movies={movies}/>}
        </React.Fragment>
    );
};

export default collection;