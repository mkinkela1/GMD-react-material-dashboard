import axios from 'axios';

import config from '../config';
import store from '../store/index';
import auth from '../store/actions/AuthAction';

export default function login(email, password, onSuccess, onError) {

  axios.post(`${config.apiUrl}/auth/login`, {
    email,
    password
  })
    .then(({data}) => {

      if(data.err)
        throw data;

      localStorage.setItem('TOKEN', data.token.token);
      localStorage.setItem('REFRESH_TOKEN', data.token.refreshToken);

      store.dispatch(auth(true));

      onSuccess();
    })
    .catch(e => onError(e));
}
