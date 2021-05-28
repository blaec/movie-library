import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import MySubmitButton from "../../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../../../UI/MyFormLabel";
import MyLinearProgress from "../MyLinearProgress";
import WishTitleInput from "./WishTitleInput";
import WishYearInput from "./WishYearInput";
import WishPreviews from "./WishPreviews";
import {feedbackActions} from "../../../../../../store/feedback-slice";
import {isArrayEmpty, isObjectEmpty} from "../../../../../../utils/Utils";
import {fetchWishMovies, saveWishMovie} from "../../../../../../store/upload-actions";

import {Card, CardActions, CardContent, FormControl} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import {uploadActions} from "../../../../../../store/upload-slice";

let isInitial = true;

const wishLoader = () => {
    const tmdbApi = useSelector(state => state.api.tmdb);
    const wishMovies = useSelector(state => state.upload.wishMovies);
    const saveResult = useSelector(state => state.upload.result);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));

    const wishTitleRef = useRef();
    const wishYearRef = useRef();

    const [selectedWishMovie, setSelectedWishMovie] = useState();
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    let hasResults = !isArrayEmpty(wishMovies);

    const handleChangeSelectedWishMovie = (current) => {
        setSelectedWishMovie(wishMovies[current]);
    };

    const handleSaveWishMovie = () => {
        setIsLoading(true);
        dispatch(saveWishMovie(selectedWishMovie));
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

    useEffect(() => {
        if (selectedWishMovie && !isObjectEmpty(saveResult)) {
            setIsLoading(false);
            const {message, success} = saveResult;
            const {title} = selectedWishMovie;
            if (success) {
                onSetSnackbar({open: true, message: `Movie '${title}' added to wishlist`, type: 'success'});
            } else {
                onSetSnackbar({open: true, message: `Failed to add movie '${title}' to wishlist: ${message}`, type: 'error'});
            }
            dispatch(uploadActions.setResult({}));
        }
    }, [saveResult])

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
                        onSubmit={handleSaveWishMovie}
                    />
                </MyButtonGrid>
            </CardActions>
            <WishPreviews
                wishMovies={wishMovies}
                onChange={handleChangeSelectedWishMovie}
            />
        </Card>
    );
};

export default wishLoader;