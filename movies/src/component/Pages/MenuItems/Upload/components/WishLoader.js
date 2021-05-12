import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MySubmitButton from "../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../../UI/MyFormLabel";
import WishPreview from "./WishPreview";
import MyLinearProgress from "./MyLinearProgress";
import axios from "../../../../../axios-movies";
import {getSearchMovieUrl, movieApi} from "../../../../../utils/UrlUtils";
import * as actions from "../../../../../store/actions";
import WishTitleInput from "./WishTitleInput";
import WishYearInput from "./WishYearInput";

import {Card, CardActions, CardContent, FormControl} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";


const wishLoader = () => {
    const configs = useSelector(state => state.api);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const wishTitle = useRef();
    const wishYear = useRef();

    const [selectedWishMovie, setSelectedWishMovie] = useState();
    const [wishMovies, setWishMovies] = useState([]);
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let hasResults = wishMovies.length > 0;
    useEffect(() => {
        if (hasResults) {
            setSelectedWishMovie(wishMovies[0]);
        }
    }, [wishMovies]);

    const handleSaveWishMovie = (wishMovie) => {
        setIsLoading(true);
        axios.post(movieApi.post.saveWishMovie, wishMovie)
            .then(response => {
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Movie '${wishMovie.title}' added to wishlist`, type: 'success'});
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
                onSetSnackbar({open: true, message: `Failed to movie '${wishMovie.title}' to wishlist`, type: 'error'});
            });
    };

    const handleSearchWishMovie = () => {
        setIsLoading(true);
        const {current : {value : title}} = wishTitle;
        const {current : {value : year}} = wishYear;
        axios.get(getSearchMovieUrl({query: title, year: year, api_key: configs.tmdbApi}))
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

    const handleSearchDisable = (isDisabled) => {
        setIsSearchDisabled(isDisabled);
    };

    let moviePreviews = <WishPreview/>;
    if (hasResults) {
        moviePreviews = <Carousel animation="slide"
                                  autoPlay={false}
                                  onChange={(active) => {
                                      setSelectedWishMovie(wishMovies[active]);
                                  }}
                                  navButtonsAlwaysVisible>
                            {wishMovies.map((poster, idx) => <WishPreview key={idx} {...poster}/>)}
                        </Carousel>;
    }

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <MyFormLabel text="Add to Wish List"/>
                    <WishTitleInput inputRef={wishTitle} onDisable={handleSearchDisable}/>
                    <WishYearInput inputRef={wishYear}/>
                </FormControl>
                <MyLinearProgress loading={isLoading}/>
            </CardContent>
            <CardActions>
                <MyButtonGrid>
                    <MySubmitButton icon={<SearchTwoToneIcon/>}
                                    buttonStyles={{marginRight: 1}}
                                    disabled={isSearchDisabled}
                                    caption="Search"
                                    onSubmit={handleSearchWishMovie}
                    />
                    <MySubmitButton icon={<AddCircleTwoToneIcon/>}
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