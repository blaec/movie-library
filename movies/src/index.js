import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_en from "./translations/en/common.json";
import common_ru from "./translations/ru/common.json";

import App from './App';
import store from "./store/state/index";

import registerServiceWorker from './registerServiceWorker';

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'en',                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        ru: {
            common: common_ru
        },
    },
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <I18nextProvider i18n={i18next}>
                <App/>
            </I18nextProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
