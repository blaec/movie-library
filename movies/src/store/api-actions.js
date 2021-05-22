import axios from "../axios-movies";
import {configApi} from "../utils/UrlUtils";
import {apiActions} from "./api-slice";
import {feedbackActions} from "./feedback-slice";

export const fetchConfigs = () => {
    return async (dispatch) => {
        dispatch(feedbackActions.setIsLoading(true));
        axios.get(configApi.get.getConfigs)
            .then(response => {
                const {data} = response;
                dispatch(apiActions.initC0onfig(data));
                dispatch(feedbackActions.setIsLoading(false));
            })
            .catch(error => {
                console.log(error);
                dispatch(feedbackActions.setIsLoading(false));
            });
    };
}
