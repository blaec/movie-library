import React from 'react';

import WishPreview from "./WishPreview";
import {isArrayEmpty} from "../../../../../../utils/Utils";

import Carousel from "react-material-ui-carousel";

const wishPreviews = (props) => {
    const {wishMovies, onChange} = props;

    let moviePreviews = <WishPreview/>;
    if (!isArrayEmpty(wishMovies)) {
        moviePreviews = (
            <Carousel
                animation="slide"
                autoPlay={false}
                onChange={(active) => onChange(active)}
                navButtonsAlwaysVisible>
                {wishMovies.map((poster, idx) => <WishPreview key={idx} {...poster}/>)}
            </Carousel>
        );
    }

    return (
        <React.Fragment>
            {moviePreviews}
        </React.Fragment>
    );
};

export default wishPreviews;