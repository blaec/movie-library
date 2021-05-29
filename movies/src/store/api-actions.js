import axios from "../axios-movies";
import {configApi} from "../utils/UrlUtils";
import {apiActions} from "./api-slice";

export const fetchConfigs = () => {
    return async (dispatch) => {
        axios.get(configApi.get.getConfigs)
            .then(response => {
                const {data} = response;
                dispatch(apiActions.initConfig(data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}
