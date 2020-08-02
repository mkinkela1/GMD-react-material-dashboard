import { authReducer } from './AuthReducer';

import { combineReducers } from 'redux';
import {createEventExpansionReducer} from './CreateEventExpansionReducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  createEventExpansionReducer: createEventExpansionReducer
});

export default rootReducer;
