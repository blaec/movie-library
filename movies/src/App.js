import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Gallery from "./component/Gallery/Gallery";

const app = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Gallery}/>
                <Route path="/update" exact component={Gallery}/>
                <Redirect to="/"/>
            </Switch>
        </Layout>
    );
}

export default app;
