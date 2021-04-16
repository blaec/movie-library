import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import globalReducer from "./store/reducers/global";
import configsReducer from "./store/reducers/configs";

const rootReducer = combineReducers({
    global: globalReducer,
    configs: configsReducer
});

const store = createStore(rootReducer);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
