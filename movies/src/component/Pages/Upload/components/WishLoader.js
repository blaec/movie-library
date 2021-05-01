import React, {useEffect, useState} from 'react';

import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../UI/MyFormLabel";
import WishPreview from "./WishPreview";
import MyLinearProgress from "./MyLinearProgress";

import {Card, CardActions, CardContent, FormControl} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";

const inputs = {
    "wish-title": {
        label: "Movie title",
        helperText: "Enter movie title",
        text: "wishTitle",
        required: true
    },
    "wish-year": {
        label: "Release year",
        helperText: "Enter movie release year",
        text: "wishYear",
        required: false
    }
};

const wishLoader = props => {
    const {loading, wishTitle, wishResults, onChangeTextField, onSubmit, onAdd} = props;
    const [selectedWishMovie, setSelectedWishMovie] = useState();
    useEffect(() => {
        if (wishResults) {
            setSelectedWishMovie(wishResults[0]);
        }
    }, [wishResults]);

    let movie = null;
    let hasResults = wishResults.length > 0;
    if (hasResults) {
        movie = <Carousel animation="slide"
                          autoPlay={false}
                          onChange={(active) => {setSelectedWishMovie(wishResults[active]);}}
                          navButtonsAlwaysVisible>
                    {wishResults.map((poster, idx) => <WishPreview key={idx} {...poster}/>)}
                </Carousel>;
    }

    const movieInputs = Object.keys(inputs).map(inputKey =>
        <MyTextField key={inputKey}
                     id={inputKey}
                     text={props[inputs[inputKey].text]}
                     label={inputs[inputKey].label}
                     helperText={inputs[inputKey].helperText}
                     required={inputs[inputKey].required}
                     onChangeTextField={onChangeTextField}
        />
    );

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <MyFormLabel text="Add to Wish List"/>
                    {movieInputs}
                </FormControl>
                <MyLinearProgress loading={loading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton icon={<SearchTwoToneIcon/>}
                                    buttonStyles={{marginRight: 1}}
                                    disabled={wishTitle.length === 0}
                                    caption="Search"
                                    onSubmit={onSubmit}
                    />
                    <MySubmitButton icon={<AddCircleTwoToneIcon/>}
                                    disabled={!hasResults}
                                    caption="Add"
                                    onSubmit={() => onAdd(selectedWishMovie)}
                    />
                </MyButtonGrid>
            </CardActions>
            {movie}
        </Card>
    );
};

export default wishLoader;