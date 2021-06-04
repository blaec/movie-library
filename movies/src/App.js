import React, {useEffect, Suspense} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";

import Layout from "./hoc/Layout";
import Collection from "./component/Pages/MenuItems/Collection/Collection";
import MyLoader from "./UI/Spinners/MyLoader";
import {reactLinks} from "./utils/UrlUtils";
import {fetchMovies, fetchWishlist} from "./store/collection-actions";
import {fetchConfigs} from "./store/api-actions";

const Wishlist = React.lazy(() => import('./component/Pages/MenuItems/Wishlist/Wishlist'));
const Filter = React.lazy(() => import('./component/Pages/MenuItems/Filter/Filter'));
const Upload = React.lazy(() => import('./component/Pages/MenuItems/Upload/Upload'));
const MovieDetails = React.lazy(() => import('./component/Pages/PathLinks/MovieDetails/MovieDetails'));
const ActorMovies = React.lazy(() => import('./component/Pages/PathLinks/ActorMovies/ActorMovies'));
const FilteredCollection = React.lazy(() => import('./component/Pages/PathLinks/FilteredCollection/FilteredCollection'));
const NowPlaying = React.lazy(() => import('./component/Pages/MenuItems/NowPlaying/NowPlaying'));

const app = () => {
    const {home, collection, filterByGenre, wishlist, filter, upload, movieDetails, actorMovies, nowPlaying} = reactLinks;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConfigs());
        dispatch(fetchMovies());
        dispatch(fetchWishlist());
    }, []);

    let layout = (
        <Layout>
            <Suspense fallback={<MyLoader/>}>
                <Switch>

                    {/* Menu items */}
                    <Route path={collection} exact component={Collection}/>
                    <Route path={wishlist} exact component={Wishlist}/>
                    <Route path={filter} exact component={Filter}/>
                    <Route path={upload} exact component={Upload}/>
                    <Route path={nowPlaying} exact component={NowPlaying}/>

                    {/* Path links */}
                    <Route path={movieDetails} exact component={props => <MovieDetails {...props}/>}/>
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
