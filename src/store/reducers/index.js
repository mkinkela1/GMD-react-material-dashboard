import { authReducer } from './AuthReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authReducer: authReducer
});

export default rootReducer;
