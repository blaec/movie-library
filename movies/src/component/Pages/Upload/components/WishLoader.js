import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MyTextField from "../../../../UI/MyTextField";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../UI/MyFormLabel";
import WishPreview from "./WishPreview";
import MyLinearProgress from "./MyLinearProgress";
import axios from "../../../../axios-movies";
import {getSearchMovieUrl} from "../../../../utils/UrlUtils";
import * as actions from "../../../../store/actions";

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
    const {wishTitle, wishYear, onChangeTextField, onAdd} = props;
    const [selectedWishMovie, setSelectedWishMovie] = useState();

    const configs = useSelector(state => state.api);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const [isLoading, setIsLoading] = useState(false);
    const [wishMovies, setWishMovies] = useState([]);

    let hasResults = wishMovies.length > 0;
    useEffect(() => {
        if (hasResults) {
            setSelectedWishMovie(wishMovies[0]);
        }
    }, [wishMovies]);

    const handleSearchWishMovie = () => {
        setIsLoading(true);
        axios.get(getSearchMovieUrl({query: wishTitle, year: wishYear, api_key: configs.tmdbApi}))
            .then(response => {
                const {data} = response;
                const {results} = data;
                let foundMovies = results;
                setWishMovies(foundMovies);
                setIsLoading(false);
                if (foundMovies.length > 0) {
                    onSetSnackbar({open: true, message: `Found ${foundMovies.length} movies`, type: 'success'});
                } else {
                    onSetSnackbar({open: true, message: `Nothing found`, type: 'warning'});
                }
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Failed to search the movies`, type: 'error'});
            });
    };

    let movie = null;
    if (hasResults) {
        movie = <Carousel animation="slide"
                          autoPlay={false}
                          onChange={(active) => {setSelectedWishMovie(wishMovies[active]);}}
                          navButtonsAlwaysVisible>
                    {wishMovies.map((poster, idx) => <WishPreview key={idx} {...poster}/>)}
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
                <MyLinearProgress loading={isLoading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton icon={<SearchTwoToneIcon/>}
                                    buttonStyles={{marginRight: 1}}
                                    disabled={wishTitle.length === 0}
                                    caption="Search"
                                    onSubmit={handleSearchWishMovie}
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