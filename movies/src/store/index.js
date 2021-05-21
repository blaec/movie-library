import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api";
import feedbackReducer from "./feedback";
import filterReducer from "./filter";
import collectionReducer from "./collection";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
        filter: filterReducer,
        collection: collectionReducer,
    },
});

export default store;