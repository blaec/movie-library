import React from 'react';
import {useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {isObjectEmpty} from "../../../../utils/Utils";

const collection = () => {
    const movies = useSelector(state => state.collection.movies);
    const isLoading = isObjectEmpty(movies);

    return (
        <React.Fragment>
            {isLoading && <MyLoader/>}
            {!isLoading && <Gallery movies={movies}/>}
        </React.Fragment>
    );
};

export default collection;