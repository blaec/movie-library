import React, {useEffect, useState} from 'react';
import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";

import {getImageUrl} from "../../../../utils/UrlUtils";
import '../Upload.css';

import {Card, CardActions, CardContent, FormControl, FormLabel, LinearProgress} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";

const inputs = {
    "wish-title": {
        label: "Movie title",
        helperText: "Enter movie title",
        text: "wishTitle"
    },
    "wish-year": {
        label: "Release year",
        helperText: "Enter movie release year",
        text: "wishYear"
    }
};

const wishLoader = props => {
    const {wishResults, alt, onChangeTextField, loading, onAdd, onSubmit} = props;
    const [selectedWishMovie, setSelectedWishMovie] = useState();
    useEffect(() => {
        if (wishResults) {
            setSelectedWishMovie(wishResults[0]);
        }
    }, [wishResults]);

    let movie = null;
    if (wishResults) {
        movie = <Carousel animation="slide"
                          autoPlay={false}
                          onChange={(active) => {setSelectedWishMovie(wishResults[active]);}}
                          navButtonsAlwaysVisible>
                    {wishResults.map((poster, idx) => {
                        let errImage = `https://via.placeholder.com/200x300.png?text=${poster.title}`
                        return <div key={idx} className="WishBlock">
                                    <img onError={(e)=>{e.target.onerror = null; e.target.src=errImage}}
                                         src={getImageUrl(poster.poster_path)}
                                         alt={alt}
                                    />
                                </div>;
                        }
                    )}
                </Carousel>;
    }

    const movieInputs = Object.keys(inputs).map(inputKey =>
        <MyTextField key={inputKey}
                     id={inputKey}
                     text={props[inputs[inputKey].text]}
                     label={inputs[inputKey].label}
                     helperText={inputs[inputKey].helperText}
                     onChangeTextField={onChangeTextField}
        />
    );

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <FormLabel>Add to Wish List</FormLabel>
                    {movieInputs}
                </FormControl>
                <LinearProgress hidden={!loading}/>
            </CardContent>
            <CardActions>
                <MySubmitButton icon={<SearchTwoToneIcon/>}
                                caption="Search"
                                onSubmit={onSubmit}
                />
                <MySubmitButton icon={<AddCircleTwoToneIcon/>}
                                disabled={!wishResults}
                                caption="Add"
                                onSubmit={() => onAdd(selectedWishMovie)}
                />
            </CardActions>
            {movie}
        </Card>
    );
};

export default wishLoader;