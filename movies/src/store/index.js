import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api";
import feedbackReducer from "./feedback";
import filterReducer from "./filter";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
        filter: filterReducer,
    },
});

export default store;