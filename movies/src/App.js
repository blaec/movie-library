import React, {Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Layout from "./hoc/Layout";
import Collection from "./component/Pages/MenuItems/Collection/Collection";
import MyLoader from "./UI/Spinners/MyLoader";
import {reactLinks} from "./utils/UrlUtils";
import {fetchMovies, fetchWishlist} from "./store/state/collection/collection-actions";
import {fetchConfigs} from "./store/state/api/api-actions";
import {isArrayExist} from "./utils/Utils";
import {collectionActions} from "./store/state/collection/collection-slice";
import {detailsActions} from "./store/state/details/details-slice";

const NewMovies = React.lazy(() => import('./component/Pages/MenuItems/NewMovies/NewMovies'));
const Wishlist = React.lazy(() => import('./component/Pages/MenuItems/Wishlist/Wishlist'));
const Filter = React.lazy(() => import('./component/Pages/MenuItems/Filter/Filter'));
const Upload = React.lazy(() => import('./component/Pages/MenuItems/Upload/Upload'));
const MovieDetails = React.lazy(() => import('./component/Pages/PathLinks/MovieDetails/MovieDetails'));
const ActorMovies = React.lazy(() => import('./component/Pages/PathLinks/ActorMovies/ActorMovies'));
const FilteredCollection = React.lazy(() => import('./component/Pages/PathLinks/FilteredCollection/FilteredCollection'));
const NowPlaying = React.lazy(() => import('./component/Pages/MenuItems/NowPlaying/NowPlaying'));
const Anticipated = React.lazy(() => import('./component/Pages/MenuItems/Anticipated/Anticipated'));
const Library = React.lazy(() => import('./component/Pages/MenuItems/Library/Library'));
const Stats = React.lazy(() => import('./component/Pages/MenuItems/Stats/Stats'));

const app = () => {
    const {
        home,
        collection,
        newMovies,
        filterByGenre,
        wishlist,
        filter,
        upload,
        movieDetails,
        actorMovies,
        nowPlaying,
        anticipated,
        library,
        stats,
    } = reactLinks;

    const movies = useSelector(state => state.collection.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConfigs());
        dispatch(fetchMovies());
        dispatch(fetchWishlist());
    }, []);

    useEffect(() => {
        if (isArrayExist(movies)) {
            const newMovies = movies.filter(movie => movie.location.includes("d_music"));
            dispatch(collectionActions.setNewMoviesCollection(newMovies));
        }
    }, [movies])

    let layout = (
        <Layout>
            <Suspense fallback={<MyLoader/>}>
                <Switch>

                    {/* Menu items */}
                    <Route path={collection} exact component={Collection}/>
                    <Route path={newMovies} exact component={NewMovies}/>
                    <Route path={wishlist} exact component={Wishlist}/>
                    <Route path={filter} exact component={Filter}/>
                    <Route path={upload} exact component={Upload}/>
                    <Route path={nowPlaying} exact component={NowPlaying}/>
                    <Route path={anticipated} exact component={Anticipated}/>
                    <Route path={library} exact component={Library}/>
                    <Route path={stats} exact component={Stats}/>

                    {/* Path links */}
                    <Route path={movieDetails} exact component={props => {
                        dispatch(detailsActions.resetAll());
                        return <MovieDetails {...props}/>
                    }}/>
                    <Route path={actorMovies} exact component={props => <ActorMovies {...props}/>}/>
                    <Route path={filterByGenre} exact component={props => <FilteredCollection {...props}/>}/>

                    <Redirect to={home}/>
                    {/*<Redirect to='*'>*/}
                    {/*    <404_PAGE/>*/}
                    {/*</Redirect>*/}
                </Switch>
            </Suspense>
        </Layout>
    );

    return (
        <React.Fragment>
            {layout}
        </React.Fragment>
    );
}

export default app;
