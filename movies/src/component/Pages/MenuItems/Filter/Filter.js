import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";

import MyRectSkeleton from "../../../../UI/Skeleton/MyRectSkeleton";
import {reactLinks} from "../../../../utils/UrlUtils";
import MyGrid from "../../../../UI/Buttons/MyGrid";
import {fetchGenres} from "../../../../store/state/filter/filter-actions";
import {collectionActions} from "../../../../store/state/collection/collection-slice";
import FilterSelect from "./components/FilterSelect";
import MyFullWidthGrid from "../../../../UI/Buttons/MyFullWidthGrid";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import {isArraysExist} from "../../../../utils/Utils";

import {Card, CardActions, Typography} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";


const filter = () => {
    const {tmdbApi, hasTmdbApi} = useSelector(state => state.api.tmdb);
    const {genres, isGenresLoaded} = useSelector(state => state.filter.genres);
    const dispatch = useDispatch();
    const {t} = useTranslation('common');

    const [inclGenreIds, setInclGenreIds] = useState([]);
    const [exclGenreIds, setExclGenreIds] = useState([]);

    useEffect(() => {
        if (hasTmdbApi) {
            dispatch(fetchGenres(tmdbApi));
            dispatch(collectionActions.resetFilteredMovies());
        }
    }, [tmdbApi]);

    const handleIncludeGenreIds = (ids) => {
        setInclGenreIds(ids);
    }

    const handleExcludeGenreIds = (ids) => {
        setExclGenreIds(ids);
    }

    let genreFilter = <MyRectSkeleton height={238}/>;
    let genreFilterOut = <MyRectSkeleton height={238}/>;
    if (isGenresLoaded) {
        genreFilter = (
            <FilterSelect
                genres={genres}
                url={reactLinks.filterByGenreEndpoint}
                caption={t('text.genres')}
                onSelectGenres={handleIncludeGenreIds}
            />
        );
        genreFilterOut = (
            <FilterSelect
                genres={genres}
                url={reactLinks.filterOutByGenreEndpoint}
                caption={t('text.excludeGenres')}
                onSelectGenres={handleExcludeGenreIds}
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
            <MyFullWidthGrid>
                {[
                    <Card variant="elevation">
                        <CardActions>
                            <MyButtonGrid>
                                <MySubmitButton
                                    disabled={!isArraysExist(inclGenreIds, exclGenreIds)}
                                    icon={<SearchTwoToneIcon/>}
                                    caption={t('button.filter')}
                                    type="success"
                                    fill="filled"
                                    component={NavLink}
                                    path={`${reactLinks.filterDualByGenreEndpoint}including-genres/${inclGenreIds}/excluding-genres/${exclGenreIds}`}
                                />
                            </MyButtonGrid>
                        </CardActions>
                    </Card>
                ]}
            </MyFullWidthGrid>
        </>
    );
};

export default filter;