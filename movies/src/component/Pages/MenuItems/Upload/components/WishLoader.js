import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MyTextField from "../../../../../UI/MyTextField";
import MySubmitButton from "../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../../UI/MyFormLabel";
import WishPreview from "./WishPreview";
import MyLinearProgress from "./MyLinearProgress";
import axios from "../../../../../axios-movies";
import {getSearchMovieUrl, movieApi} from "../../../../../utils/UrlUtils";
import * as actions from "../../../../../store/actions";

import {Card, CardActions, CardContent, FormControl} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import Carousel from "react-material-ui-carousel";


const wishLoader = () => {
    const configs = useSelector(state => state.api);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(actions.setSnackbar(snackbar));

    const [selectedWishMovie, setSelectedWishMovie] = useState();
    const [wishMovies, setWishMovies] = useState([]);
    const [wishTitle, setWishTitle] = useState('');
    const [wishYear, setWishYear] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const inputs = [
        {
            id: "wish-title",
            label: "Movie title",
            helperText: "Enter movie title",
            text: wishTitle,
            required: true
        },
        {
            id: "wish-year",
            label: "Release year",
            helperText: "Enter movie release year",
            text: wishYear,
            required: false
        }
    ];

    let hasResults = wishMovies.length > 0;
    useEffect(() => {
        if (hasResults) {
            setSelectedWishMovie(wishMovies[0]);
        }
    }, [wishMovies]);

    const handleTextFieldChange = (text, id) => {
        switch (id) {
            case "wish-title":  setWishTitle(text);   break;
            case "wish-year":   setWishYear(text);    break;
            default:            onSetSnackbar({open: true, message: `Upload -> handleTextFields -> wrong id`, type: 'error'})
        }
    };

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

    const textFields = inputs.map(input => {
        const {id, label, helperText, text, required} = input;
            return <MyTextField key={id}
                                id={id}
                                text={text}
                                label={label}
                                helperText={helperText}
                                required={required}
                                onChangeTextField={handleTextFieldChange}
            />;
        }
    );

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <MyFormLabel text="Add to Wish List"/>
                    {textFields}
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
                                    onSubmit={() => handleSaveWishMovie(selectedWishMovie)}
                    />
                </MyButtonGrid>
            </CardActions>
            {moviePreviews}
        </Card>
    );
};

export default wishLoader;