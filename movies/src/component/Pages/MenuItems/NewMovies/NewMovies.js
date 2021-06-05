import React from 'react';

import useGallery from "../../../../hooks/use-gallery";

const newMovies = () => {
    return useGallery("newMovies");
};

export default newMovies;