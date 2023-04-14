import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";

import MyRectSkeleton from "../../../../UI/Skeleton/MyRectSkeleton";
import {reactLinks} from "../../../../utils/UrlUtils";
import {fetchGenres} from "../../../../store/state/filter/filter-actions";
import {collectionActions} from "../../../../store/state/collection/collection-slice";
import FilterSelect from "./components/FilterSelect";
import MyFullWidthGrid from "../../../../UI/Buttons/MyFullWidthGrid";
import MyButtonGrid from "../../../../UI/Buttons/MyButtonGrid";
import MySubmitButton from "../../../../UI/Buttons/MySubmitButton";
import {isArraysExist} from "../../../../utils/Utils";
import MyInnerGrid from "../../../../UI/Buttons/MyInnerGrid";

import {Card, CardActions, CardContent, Typography} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';


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
                    <Card key={1} variant="elevation">
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
            <MyFullWidthGrid>
                {[
                    <Card key={1} variant="elevation">
                        <CardContent>
                            <MyInnerGrid>
                                {[
                                    <React.Fragment key={1}>
                                        {genreFilter}
                                    </React.Fragment>,
                                    <React.Fragment key={2}>
                                        {genreFilterOut}
                                    </React.Fragment>
                                ]}
                            </MyInnerGrid>
                        </CardContent>
                        <CardActions>
                            <MyButtonGrid>
                                <MySubmitButton
                                    disabled={!isArraysExist(inclGenreIds, exclGenreIds)}
                                    icon={<FindInPageTwoToneIcon/>}
                                    caption={t('button.dualFilter')}
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