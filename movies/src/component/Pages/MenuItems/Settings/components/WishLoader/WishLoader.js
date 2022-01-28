import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MySubmitButton from "../../../../../../UI/Buttons/MySubmitButton";
import MyButtonGrid from "../../../../../../UI/Buttons/MyButtonGrid";
import MyFormLabel from "../../../../../../UI/MyFormLabel";
import MyLinearProgress from "../MyLinearProgress";
import WishTitleInput from "./WishTitleInput";
import WishYearInput from "./WishYearInput";
import WishPreviews from "./WishPreviews";
import {feedbackActions} from "../../../../../../store/state/feedback/feedback-slice";
import {fetchWishMovies, saveWishMovie} from "../../../../../../store/state/settings/settings-actions";

import {Card, CardActions, CardContent, FormControl} from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import {settingsActions} from "../../../../../../store/state/settings/settings-slice";
import {Loader} from "../../../../../../utils/Constants";

let isInitial = true;

const wishLoader = () => {
    const {tmdbApi} = useSelector(state => state.api.tmdb);
    const {wishMovies, isWishMoviesLoaded} = useSelector(state => state.settings.wishMovies);
    const {saveResult, hasSaveResult} = useSelector(state => state.settings.result);
    const loader = useSelector(state => state.settings.loader);
    const dispatch = useDispatch();
    const onSetSnackbar = (snackbar) => dispatch(feedbackActions.setSnackbar(snackbar));
    const {t} = useTranslation('common');

    const wishTitleRef = useRef();
    const wishYearRef = useRef();

    const [selectedWishMovie, setSelectedWishMovie] = useState();
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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
            if (isWishMoviesLoaded) {
                setSelectedWishMovie(wishMovies[0]);
            }
            if (loader === Loader.wishMovie) {
                if (isWishMoviesLoaded) {
                    onSetSnackbar({message: t('snackbar.foundMovies', {count: wishMovies.length}), type: 'info'});
                } else {
                    onSetSnackbar({message: t('snackbar.noResult'), type: 'warning'});
                }
            }
        }
    }, [wishMovies])

    useEffect(() => {
        if (selectedWishMovie && hasSaveResult) {
            setIsLoading(false);
            const {title, message, success} = saveResult;
            if (success) {
                onSetSnackbar({message: t('snackbar.addToWishlist', {title: title}), type: 'success'});
            } else {
                onSetSnackbar({message: t('snackbar.failedToAddToWishlist', {title: title, message: message}), type: 'error'});
            }
            dispatch(settingsActions.resetResult());
        }
    }, [saveResult])

    return (
        <Card variant="elevation">
            <CardContent>
                <FormControl component="wish-upload">
                    <MyFormLabel text={t('text.addToWishList')}/>
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
                        caption={t('button.search')}
                        onSubmit={handleSearchWishMovie}
                    />
                    <MySubmitButton
                        icon={<AddCircleTwoToneIcon/>}
                        disabled={!isWishMoviesLoaded}
                        caption={t('button.add')}
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