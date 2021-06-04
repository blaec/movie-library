import React from 'react';

import useGallery from "../../../../hooks/use-gallery";

const collection = () => {
    return useGallery("movies");
};

export default collection;