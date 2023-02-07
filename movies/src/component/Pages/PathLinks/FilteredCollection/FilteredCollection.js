import React, {Suspense, useEffect} from 'react';
import {useLocation, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MyResponse from "../../../../UI/MyResponse";
import Gallery from "../../../Gallery/Gallery/Gallery";
import MyLoader from "../../../../UI/Spinners/MyLoader";
import {
    fetchDualFilteredCollection,
    fetchFilteredCollection
} from "../../../../store/state/collection/collection-actions";
import {isArrayExist, isStringExist, isStringsExist} from "../../../../utils/Utils";
import {feedbackActions} from "../../../../store/state/feedback/feedback-slice";
import {movieApi, reactLinks} from "../../../../utils/UrlUtils";


const filteredCollection = () => {
    const params = useParams();
    const {pathname} = useLocation();
    const {genreIds, inclGenreIds, exclGenreIds} = params;
    const {t} = useTranslation('common');

    const {filteredMovies, isFilteredMoviesLoaded} = useSelector(state => state.collection.filteredMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isStringExist(genreIds)) {
            let url = pathname.includes(reactLinks.filterByGenreEndpoint)
                ? movieApi.get.getAllByGenresIncluding
                : movieApi.get.getAllByGenresExcluding;
            dispatch(fetchFilteredCollection(url, genreIds));
        } else if (isStringsExist(inclGenreIds, exclGenreIds)) {
            dispatch(fetchDualFilteredCollection(movieApi.get.getAllByGenresDualFilter, inclGenreIds, exclGenreIds))
        } else {
            console.error("Filter conditions do not match")
        }
    }, [genreIds]);

    let hasMovies = isFilteredMoviesLoaded && isArrayExist(filteredMovies);
    useEffect(() => {
        if (hasMovies) {
            dispatch(feedbackActions.setSnackbar({
                message: `${t('snackbar.foundMovies', {count: filteredMovies.length})}`,
                type: 'info'
            }));
        }
    }, [filteredMovies]);


    return (
        <Suspense fallback={<MyLoader/>}>
            {isFilteredMoviesLoaded && !isArrayExist(filteredMovies) && <MyResponse message={t('snackbar.noGenreMatch')}/>}
            {hasMovies &&  <Gallery movies={filteredMovies}/>}
        </Suspense>
    );
};

export default filteredCollection;