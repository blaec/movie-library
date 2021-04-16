import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Collection from "./component/Pages/Collection/Collection";
import FilteredCollection from "./component/Pages/Collection/FilteredCollection";
import Upload from "./component/Pages/Upload/Upload";
import Wishlist from "./component/Pages/Wishlist/Wishlist";
import Filter from "./component/Pages/Filter/Filter";
import {configApi, movieApi, reactLinks} from "./utils/UrlUtils";
import './utils/Constants.css';
import axios from "./axios-movies";
import MyLoader from "./UI/Spinners/MyLoader";

const app = () => {
    const [configs, setConfigs] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(configApi.get.getConfigs)
            .then(response => {
                setConfigs(response.data)
                console.log(response.data);
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
                    <Route path={reactLinks.home} exact component={Collection}/>
                    <Route path={reactLinks.filtered} exact component={FilteredCollection}/>
                    <Route path={reactLinks.wishlist} exact component={Wishlist}/>
                    <Route path={reactLinks.filter} exact component={Filter}/>
                    <Route path={reactLinks.upload} exact component={Upload}/>
                    <Redirect to={reactLinks.home}/>
                </Switch>
            </Layout>;
    }

    return (
        <div>
            {layout}
        </div>
    );
}

export default app;
