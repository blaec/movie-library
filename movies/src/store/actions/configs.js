import * as actionTypes from './actionTypes';

export const initConfigs = (configs) => {
    return {
        type: actionTypes.INIT_CONFIGS,
        configs: configs
    }
};
