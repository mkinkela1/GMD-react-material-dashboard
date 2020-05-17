import axios from 'axios';

import config from '../config';

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

      onSuccess();
    })
    .catch(e => onError(e));
}
