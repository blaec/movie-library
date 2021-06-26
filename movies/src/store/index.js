import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./state/api/api-slice";
import feedbackReducer from "./state/feedback/feedback-slice";
import filterReducer from "./filter-slice";
import collectionReducer from "./state/collection/collection-slice";
import uploadReducer from "./upload-slice";
import detailsReducer from "./state/details/details-slice";

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