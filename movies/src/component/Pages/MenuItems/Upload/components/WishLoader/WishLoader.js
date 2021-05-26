import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MySubmitButton from "../../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../../../UI/MyFormLabel";
import WishPreview from "./WishPreview";
import MyLinearProgress from "../MyLinearProgress";
import axios from "../../../../../../axios-movies";
import {movieApi} from "../../../../../../utils/UrlUtils";
import WishTitleInput from "./WishTitleInput";
import WishYearInput from "./WishYearInput";
import {feedbackActions} from "../../../../../../store/feedback-slice";

import {Card, CardActions, CardContent, FormControl} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";
import {isArrayEmpty} from "../../../../../../utils/Utils";
import {fetchWishMovies} from "../../../../../../store/upload-actions";
import {fetchWishlist} from "../../../../../../store/collection-actions";

let isInitial = true;

const wishLoader = () => {
    console.log("wishloader");
    const tmdbApi = useSelector(state => state.api.tmdb);
    const wishMovies = useSelector(state => state.upload.wishMovies);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const wishTitleRef = useRef();
    const wishYearRef = useRef();

    const [selectedWishMovie, setSelectedWishMovie] = useState();
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeSelectedWishMovie = (current) => {
        setSelectedWishMovie(wishMovies[current]);
    };

    const handleSaveWishMovie = (wishMovie) => {
        setIsLoading(true);
        axios.post(movieApi.post.saveWishMovie, wishMovie)
            .then(response => {
                const {data: {message, success}} = response;
                setIsLoading(false);
                dispatch(fetchWishlist());
                if (success) {
                    onSetSnackbar({open: true, message: `Movie '${wishMovie.title}' added to wishlist`, type: 'success'});
                } else {
                    onSetSnackbar({open: true, message: `Failed to add movie '${wishMovie.title}' to wishlist - ${message}`, type: 'error'});
                }
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Failed to add movie '${wishMovie.title}' to wishlist`, type: 'error'});
            });
    };

    const handleSearchWishMovie = () => {
        setIsLoading(true);
        const {current: {value: title}} = wishTitleRef;
        const {current: {value: year}} = wishYearRef;
        dispatch(fetchWishMovies({query: title, year: year, api_key: tmdbApi}));
    };

    const handleSearchDisable = (isDisabled) => {
        setIsSearchDisabled(isDisabled);
    };

    let moviePreviews = <WishPreview/>;
    let hasResults = !isArrayEmpty(wishMovies);
    if (hasResults) {
        moviePreviews = (
            <Carousel
                animation="slide"
                autoPlay={false}
                onChange={(active) => handleChangeSelectedWishMovie(active)}
                navButtonsAlwaysVisible>
                {wishMovies.map((poster, idx) => <WishPreview key={idx} {...poster}/>)}
            </Carousel>
        );
    }
    useEffect(() => {
        if (isInitial) {
            isInitial = false;
        } else {
            setIsLoading(false);
            if (hasResults) {
                setSelectedWishMovie(wishMovies[0]);
                onSetSnackbar({open: true, message: `Found ${wishMovies.length} movies`, type: 'success'});
            } else {
                onSetSnackbar({open: true, message: `Nothing found`, type: 'warning'});
            }
        }
    }, [hasResults, wishMovies])

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <MyFormLabel text="Add to Wish List"/>
                    <WishTitleInput
                        inputRef={wishTitleRef}
                        onSearchDisable={handleSearchDisable}/>
                    <WishYearInput inputRef={wishYearRef}/>
                </FormControl>
                <MyLinearProgress loading={isLoading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton
                        icon={<SearchTwoToneIcon/>}
                        buttonStyles={{marginRight: 1}}
                        disabled={isSearchDisabled}
                        caption="Search"
                        onSubmit={handleSearchWishMovie}
                    />
                    <MySubmitButton
                        icon={<AddCircleTwoToneIcon/>}
                        disabled={!hasResults}
                        caption="Add"
                        onSubmit={() => handleSaveWishMovie(selectedWishMovie)}
                    />
                </MyButtonGrid>
            </CardActions>
            {moviePreviews}
        </Card>
    );
};

export default wishLoader;