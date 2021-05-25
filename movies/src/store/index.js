import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api-slice";
import feedbackReducer from "./feedback-slice";
import filterReducer from "./filter-slice";
import collectionReducer from "./collection-slice";
import uploadReducer from "./upload-slice";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
        filter: filterReducer,
        collection: collectionReducer,
        upload: uploadReducer,
    },
});

export default store;