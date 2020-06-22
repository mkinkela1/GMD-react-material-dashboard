import axios from 'axios';
import refreshToken from './refreshToken';
import {REFRESH_TOKEN, TOKEN} from '../constants/AuthConstants';
import logout from './logout';

axios.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem(TOKEN);

    if(token)
      config.headers['Authorization'] = `Bearer ${token}`;

    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    config.headers['Accept-Language'] = 'en';

    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {

    const originalRequest = error.config;
    const { status } = error.response;
    console.log(error);

    if(status === 401 && localStorage.getItem(REFRESH_TOKEN)) {

      refreshToken()
        .then(response => {

          // @ts-ignore
          const { token } = response.data;

          axios.defaults.headers['Authorization'] = token.token;
          originalRequest.headers['Authorization'] = token.token;

          localStorage.setItem(TOKEN, token.token);
          localStorage.setItem(REFRESH_TOKEN, token.refreshToken);

          return axios(originalRequest);
        })
        .catch(error => logout())
    }

    return Promise.reject(error);
  }
);

export default axios;
