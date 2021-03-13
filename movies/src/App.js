import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Gallery from "./component/Pages/Gallery/Gallery/Gallery";
import AllMovies from "./component/Pages/Wishlist/AllMovies";
import Upload from "./component/Pages/Upload/Upload";
import Wishlist from "./component/Pages/Wishlist/Wishlist";
import {reactLinks} from "./utils/UrlUtils";
import './utils/Constants.css';

const app = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={reactLinks.gallery} exact component={AllMovies}/>
                    <Route path={reactLinks.wishlist} exact component={Wishlist}/>
                    <Route path={reactLinks.upload} exact component={Upload}/>
                    <Redirect to={reactLinks.home}/>
                </Switch>
            </Layout>
        </div>
    );
}

export default app;
