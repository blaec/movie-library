import React, {useEffect, useState} from 'react';
import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";

import '../Upload.css';

import {Card, CardActions, CardContent, FormControl, FormLabel, LinearProgress} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";
import {getImageUrl} from "../../../../utils/UrlUtils";

const wishLoader = props => {
    const [selectedWishMovie, setSelectedWishMovie] = useState();
    useEffect(() => {
        if (props.wishResults) {
            setSelectedWishMovie(props.wishResults[0]);
        }
    }, [props.wishResults]);

    let movie = null;
    if (props.wishResults) {
        movie = <Carousel animation="slide"
                          autoPlay={false}
                          onChange={(active) => {setSelectedWishMovie(props.wishResults[active]);}}
                          navButtonsAlwaysVisible>
                    {props.wishResults.map((poster, idx) => {
                        let errImage = `https://via.placeholder.com/200x300.png?text=${poster.title}`
                        return <div key={idx} className="WishBlock">
                                    <img onError={(e)=>{e.target.onerror = null; e.target.src=errImage}}
                                         src={getImageUrl(poster.poster_path)}
                                         alt={props.alt}
                                    />
                                </div>;
                        }
                    )}
                </Carousel>
    }

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <FormLabel>Add to Wish List</FormLabel>
                    <MyTextField id="wish-title"
                                 label="Movie title"
                                 helperText="Enter movie title"
                                 onChangeTextField={props.onChangeTextField}
                    />
                    <MyTextField id="wish-year"
                                 label="Release year"
                                 helperText="Enter movie release year"
                                 onChangeTextField={props.onChangeTextField}
                    />
                </FormControl>
                <LinearProgress hidden={!props.loading}/>
            </CardContent>
            <CardActions>
                <MySubmitButton icon={<SearchTwoToneIcon/>}
                                submit={props.submit}
                                caption="Search"
                />
                <MySubmitButton icon={<AddCircleTwoToneIcon/>}
                                submit={() => props.add(selectedWishMovie)}
                                disabled={!props.wishResults}
                                caption="Add"
                />
            </CardActions>
            {movie}
        </Card>
    );
};

export default wishLoader;