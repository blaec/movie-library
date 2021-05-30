import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";

import Layout from "./hoc/Layout";
import Collection from "./component/Pages/MenuItems/Collection/Collection";
import FilteredCollection from "./component/Pages/PathLinks/FilteredCollection/FilteredCollection";
import Upload from "./component/Pages/MenuItems/Upload/Upload";
import Wishlist from "./component/Pages/MenuItems/Wishlist/Wishlist";
import Filter from "./component/Pages/MenuItems/Filter/Filter";
import MovieDetails from "./component/Pages/PathLinks/MovieDetails/MovieDetails";
import ActorMovies from "./component/Pages/PathLinks/ActorMovies/ActorMovies";
import {reactLinks} from "./utils/UrlUtils";
import {fetchMovies, fetchWishlist} from "./store/collection-actions";
import {fetchConfigs} from "./store/api-actions";

const app = () => {
    const {home, collection, filterByGenre, wishlist, filter, upload, movieDetails, actorMovies} = reactLinks;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchConfigs());
        dispatch(fetchMovies());
        dispatch(fetchWishlist());
    }, []);

    let layout = (
        <Layout>
            <Switch>

                {/* Menu items */}
                <Route path={collection} exact component={Collection}/>
                <Route path={wishlist} exact component={Wishlist}/>
                <Route path={filter} exact component={Filter}/>
                <Route path={upload} exact component={Upload}/>

                {/* Path links */}
                <Route path={movieDetails} exact component={props => <MovieDetails {...props}/>}/>
                <Route path={actorMovies} exact component={props => <ActorMovies {...props}/>}/>
                <Route path={filterByGenre} exact component={props => <FilteredCollection {...props}/>}/>

                <Redirect to={home}/>
                {/*<Redirect to='*'>*/}
                {/*    <404_PAGE/>*/}
                {/*</Redirect>*/}
            </Switch>
        </Layout>
    );

    return (
        <React.Fragment>
            {layout}
        </React.Fragment>
    );
}

export default app;
