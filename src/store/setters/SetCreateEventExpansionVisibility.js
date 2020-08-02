import toggle from '../actions/CreateEventExpansion';

export default function setCreateEventExpansionVisibility(visibility) {

  return dispatch => dispatch(toggle(visibility));
}
