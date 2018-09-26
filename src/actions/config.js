import axios from 'axios';

export function  getConfigRequest(bool) {
    return {
        type: 'CONFIG_REQUEST',
        configRequest: bool
    };
}

export function  getConfigSuccess(config) {
    return {
        type: 'CONFIG_SUCCESS',
        config
    };
}

export function getConfig(){
    return (dispatch) => {
        dispatch(getConfigRequest(true));

        const config = localStorage.getItem('config');
        if (config) {
          dispatch(getConfigSuccess(JSON.parse(config)));
          dispatch(getConfigRequest(false));
          return;
        }

        axios.get("/cfg.json")
          .then((response) => {
                dispatch(getConfigSuccess(response.data));
                dispatch(getConfigRequest(false));
                localStorage.setItem('config', JSON.stringify(response.data));
        })
        .catch(() => dispatch(getConfigRequest(true)));
    }
}
