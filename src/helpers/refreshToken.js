import axios from 'axios';

import {REFRESH_TOKEN} from '../constants/AuthConstants';
import config from '../config';

export default function refreshToken() {

  return new Promise((resolve, reject) => {

    const data = {
      refreshToken: localStorage.getItem(REFRESH_TOKEN)
    }

    axios
      .post(`${config.apiUrl}/auth/refresh-token`, data)
      .then(r => resolve(r))
      .catch(e => reject(e));
  });
}
