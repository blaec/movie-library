import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api-slice";
import feedbackReducer from "./feedback-slice";
import filterReducer from "./filter-slice";
import collectionReducer from "./collection-slice";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
        filter: filterReducer,
        collection: collectionReducer,
    },
});

export default store;