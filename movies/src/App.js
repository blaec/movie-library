import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Collection from "./component/Pages/Collection/Collection";
import Upload from "./component/Pages/Upload/Upload";
import Wishlist from "./component/Pages/Wishlist/Wishlist";
import Filter from "./component/Pages/Filter";
import {reactLinks} from "./utils/UrlUtils";
import './utils/Constants.css';

const app = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={reactLinks.home} exact component={Collection}/>
                    <Route path={reactLinks.wishlist} exact component={Wishlist}/>
                    <Route path={reactLinks.filter} exact component={Filter}/>
                    <Route path={reactLinks.upload} exact component={Upload}/>
                    <Redirect to={reactLinks.home}/>
                </Switch>
            </Layout>
        </div>
    );
}

export default app;
