import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api";
import feedbackReducer from "./feedback";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
    },
});

export default store;