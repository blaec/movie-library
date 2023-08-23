import {configureStore} from "@reduxjs/toolkit";

import apiReducer from "./api/api-slice";
import feedbackReducer from "./feedback/feedback-slice";
import filterReducer from "./filter/filter-slice";
import collectionReducer from "./collection/collection-slice";
import addNewReducer from "./addNew/addNew-slice";
import detailsReducer from "./details/details-slice";

const store = configureStore({
    reducer: {
        api: apiReducer,
        feedback: feedbackReducer,
        filter: filterReducer,
        collection: collectionReducer,
        addNew: addNewReducer,
        details: detailsReducer,
    },
});

export default store;