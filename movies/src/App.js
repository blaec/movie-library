import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Gallery from "./component/Gallery/Gallery";
import Upload from "./component/Upload/Upload";
import './utils/Constants.css';

const app = () => {
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Gallery}/>
                    <Route path="/update" exact component={Upload}/>
                    <Redirect to="/"/>
                </Switch>
            </Layout>
        </div>
    );
}

export default app;
