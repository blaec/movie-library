import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api-slice";
import feedbackReducer from "./state/feedback/feedback-slice";
import filterReducer from "./filter-slice";
import collectionReducer from "./collection-slice";
import uploadReducer from "./upload-slice";
import detailsReducer from "./details-slice";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
        filter: filterReducer,
        collection: collectionReducer,
        upload: uploadReducer,
        details: detailsReducer,
    },
});

export default store;