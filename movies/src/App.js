import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "./axios-movies";

import Layout from "./hoc/Layout";
import Collection from "./component/Pages/MenuItems/Collection/Collection";
import FilteredCollection from "./component/Pages/MenuItems/Collection/FilteredCollection";
import Upload from "./component/Pages/MenuItems/Upload/Upload";
import Wishlist from "./component/Pages/MenuItems/Wishlist/Wishlist";
import Filter from "./component/Pages/MenuItems/Filter/Filter";
import MovieDetails from "./component/Pages/PathLinks/MovieDetails/MovieDetails";
import ActorMovies from "./component/Pages/PathLinks/ActorMovies/ActorMovies";
import MyLoader from "./UI/Spinners/MyLoader";
import {configApi, reactLinks} from "./utils/UrlUtils";
import * as actions from "./store/actions";
import {apiActions} from "./store/api";

const app = () => {
    const {home, filtered, wishlist, filter, upload, movieDetails, actorMovies} = reactLinks;

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const tmdbApi = useSelector(state => state.api.tmdb);
    // const onConfigsInit = (allConfigs) => dispatch(actions.initConfigs(allConfigs));

    const initConfig = (data) => {
        dispatch(apiActions.initConfig(data));
        dispatch(apiActions.increment());
    };
    console.log(tmdbApi);

    useEffect(() => {
        setIsLoading(true);
        axios.get(configApi.get.getConfigs)
            .then(response => {
                const {data} = response;
                initConfig(data);
                dispatch(apiActions.ab());
                // onConfigsInit(data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    let layout = <MyLoader/>;
    if (!isLoading) {
        layout =
            <Layout>
                <Switch>

                    {/* Menu items */}
                    <Route path={home} exact component={Collection}/>
                    <Route path={filtered} exact component={FilteredCollection}/>
                    <Route path={wishlist} exact component={Wishlist}/>
                    <Route path={filter} exact component={Filter}/>
                    <Route path={upload} exact component={Upload}/>

                    {/* Path links */}
                    <Route path={movieDetails} exact component={props => <MovieDetails {...props}/>}/>
                    <Route path={actorMovies} exact component={props => <ActorMovies {...props}/>}/>

                    <Redirect to={home}/>
                </Switch>
            </Layout>;
    }

    return (
        <React.Fragment>
            {layout}
        </React.Fragment>
    );
}

export default app;
