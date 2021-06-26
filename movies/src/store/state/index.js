import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api/api-slice";
import feedbackReducer from "./feedback/feedback-slice";
import filterReducer from "./filter/filter-slice";
import collectionReducer from "./collection/collection-slice";
import uploadReducer from "./upload/upload-slice";
import detailsReducer from "./details/details-slice";

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