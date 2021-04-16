import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "./axios-movies";

import Layout from "./hoc/Layout/Layout";
import Collection from "./component/Pages/Collection/Collection";
import FilteredCollection from "./component/Pages/Collection/FilteredCollection";
import Upload from "./component/Pages/Upload/Upload";
import Wishlist from "./component/Pages/Wishlist/Wishlist";
import Filter from "./component/Pages/Filter/Filter";
import MyLoader from "./UI/Spinners/MyLoader";
import {configApi, reactLinks} from "./utils/UrlUtils";
import * as actions from "./store/actions";
import './utils/Constants.css';

const app = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const onConfigsInit = (allConfigs) => dispatch(actions.initConfigs(allConfigs));

    useEffect(() => {
        setIsLoading(true);
        axios.get(configApi.get.getConfigs)
            .then(response => {
                onConfigsInit(response.data)
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
