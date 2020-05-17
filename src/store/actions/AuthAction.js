import { AUTH } from '../constants/AuthConstants';

const auth = (isAuthenticated) => ({
  type: AUTH,
  isAuthenticated: isAuthenticated
});

export default auth;
