import React from 'react';
import {useSelector} from "react-redux";

import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";

const collection = () => {
    const movies = useSelector(state => state.collection.movies);
    const isLoading = useSelector(state => state.feedback.isLoading);

    let gallery = <MyLoader/>;
    if (!isLoading) {
        gallery = <Gallery movies={movies}/>
    }

    return (
        <React.Fragment>
            {gallery}
        </React.Fragment>
    );
};

export default collection;