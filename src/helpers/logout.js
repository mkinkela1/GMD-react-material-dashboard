import axios from 'axios';

import config from '../config';
import store from '../store/index';
import auth from '../store/actions/AuthAction';
import {REFRESH_TOKEN, TOKEN} from '../constants/AuthConstants';

export default function logout() {

  axios.post(`${config.apiUrl}/auth/logout`, {
    token: localStorage.getItem(TOKEN),
    refreshToken: localStorage.getItem(REFRESH_TOKEN)
  })
    .then(({data}) => {

      if(data.err)
        throw data;

      store.dispatch(auth(false));

      localStorage.removeItem(TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    })
    .catch(e => console.log(e));
}
