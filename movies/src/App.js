import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";

import Layout from "./hoc/Layout";
import Collection from "./component/Pages/MenuItems/Collection/Collection";
import {reactLinks} from "./utils/UrlUtils";
import {fetchMovies, fetchWishlist} from "./store/state/collection/collection-actions";
import {fetchConfigs} from "./store/state/api/api-actions";
import {detailsActions} from "./store/state/details/details-slice";
import {useLocation} from "react-router";
import {currentLocation, language, previousLocation} from "./store/localStorage/actions";
import {useTranslation} from "react-i18next";
import {collectionActions} from "./store/state/collection/collection-slice";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";

const NewMovies = React.lazy(() => import('./component/Pages/MenuItems/NewMovies/NewMovies'));
const Wishlist = React.lazy(() => import('./component/Pages/MenuItems/Wishlist/Wishlist'));
const Filter = React.lazy(() => import('./component/Pages/MenuItems/Filter/Filter'));
const Settings = React.lazy(() => import('./component/Pages/MenuItems/Settings/Settings'));
const MovieDetails = React.lazy(() => import('./component/Pages/PathLinks/MovieDetails/MovieDetails'));
const ActorDetails = React.lazy(() => import('./component/Pages/PathLinks/ActorDetails/ActorDetails'));
const FilteredCollection = React.lazy(() => import('./component/Pages/PathLinks/FilteredCollection/FilteredCollection'));
const TopRated = React.lazy(() => import('./component/Pages/MenuItems/TopRated/TopRated'));
const NowPlaying = React.lazy(() => import('./component/Pages/MenuItems/NowPlaying/NowPlaying'));
const Anticipated = React.lazy(() => import('./component/Pages/MenuItems/Anticipated/Anticipated'));
const Library = React.lazy(() => import('./component/Pages/MenuItems/Library/Library'));

const theme = createTheme();

const app = () => {
    const {pathname} = useLocation();
    const {
        home,
        collection,
        newMovies,
        filterByGenre,
        filterOutByGenre,
        filterDualByGenre,
        wishlist,
        filter,
        settings,
        movieDetails,
        actorDetails,
        topRated,
        nowPlaying,
        anticipated,
        library,
    } = reactLinks;
    const {i18n} = useTranslation('common');

    const dispatch = useDispatch();

    previousLocation.set(currentLocation.get());
    currentLocation.set(pathname);

    useEffect(() => {
        dispatch(fetchConfigs());
        dispatch(fetchMovies());
        dispatch(fetchWishlist());
    }, []);

    useEffect(() => {
        if (language.get() === null) {
            language.set('en');
        }
        i18n.changeLanguage(language.get());
    }, [language.get()]);

    let layout = (
        <Layout>
            <Suspense fallback={null}>
                <Switch>

                    {/* Menu items */}
                    <Route path={collection} exact component={Collection}/>
                    <Route path={newMovies} exact component={NewMovies}/>
                    <Route path={wishlist} exact component={Wishlist}/>
                    <Route path={filter} exact component={Filter}/>
                    <Route path={settings} exact component={Settings}/>
                    <Route path={topRated} exact component={TopRated}/>
                    <Route path={nowPlaying} exact component={NowPlaying}/>
                    <Route path={anticipated} exact component={Anticipated}/>
                    <Route path={library} exact component={Library}/>

                    {/* Path links */}
                    <Route path={movieDetails} exact component={props => {
                        dispatch(detailsActions.resetAll());
                        dispatch(collectionActions.resetPosterResults());
                        dispatch(collectionActions.resetGenreResults());
                        return <MovieDetails {...props}/>
                    }}/>
                    <Route path={actorDetails} exact component={props => <ActorDetails {...props}/>}/>
                    <Route path={filterByGenre} exact component={props => <FilteredCollection {...props}/>}/>
                    <Route path={filterOutByGenre} exact component={props => <FilteredCollection {...props}/>}/>
                    <Route path={filterDualByGenre} exact component={props => <FilteredCollection {...props}/>}/>

                    <Redirect to={home}/>
                    {/*<Redirect to='*'>*/}
                    {/*    <404_PAGE/>*/}
                    {/*</Redirect>*/}
                </Switch>
            </Suspense>
        </Layout>
    );

    return (
        <ThemeProvider  theme={theme}>
            {layout}
        </ThemeProvider>
    );
}

export default app;
