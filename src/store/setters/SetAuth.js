import auth from '../actions/AuthAction';

export default function setAuth (isAuthenticated) {

  return dispatch => dispatch(auth(isAuthenticated))
}
