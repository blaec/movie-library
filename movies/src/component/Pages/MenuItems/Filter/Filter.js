import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import MyRectSkeleton from "../../../../UI/Skeleton/MyRectSkeleton";
import {reactLinks} from "../../../../utils/UrlUtils";
import MyGrid from "../../../../UI/Buttons/MyGrid";
import {fetchGenres} from "../../../../store/state/filter/filter-actions";
import {collectionActions} from "../../../../store/state/collection/collection-slice";
import FilterSelect from "./components/FilterSelect";
import MyFullWidthGrid from "../../../../UI/Buttons/MyFullWidthGrid";

import {Card, CardActions, Typography} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";


const filter = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const {genres, isGenresLoaded} = useSelector(state => state.filter.genres);
    const dispatch = useDispatch();
    const {t} = useTranslation('common');

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(fetchGenres(tmdbApi));
            dispatch(collectionActions.resetFilteredMovies());
        }
    }, [tmdbApi]);

    let genreFilter = <MyRectSkeleton height={238}/>;
    let genreFilterOut = <MyRectSkeleton height={238}/>;
    if (isGenresLoaded) {
        genreFilter = (
            <FilterSelect
                genres={genres}
                url={reactLinks.filterByGenreEndpoint}
                caption={t('text.genres')}
            />
        );
        genreFilterOut = (
            <FilterSelect
                genres={genres}
                url={reactLinks.filterOutByGenreEndpoint}
                caption={t('text.excludeGenres')}
            />
        );
    }


    return (
        <>
            <MyFullWidthGrid>
                {[
                    <Card variant="elevation">
                        <CardActions>
                            <ErrorOutlineIcon color='error'/>
                            <Typography
                                display='inline'
                                variant='caption'
                                color='textSecondary'
                            >
                                {t('helperText.genreMismatch')}
                            </Typography>
                        </CardActions>
                    </Card>
                ]}
            </MyFullWidthGrid>
            <MyGrid>
                {[
                    <React.Fragment key={1}>
                        {genreFilter}
                    </React.Fragment>,
                    <React.Fragment key={2}>
                        {genreFilterOut}
                    </React.Fragment>
                ]}
            </MyGrid>
        </>
    );
};

export default filter;