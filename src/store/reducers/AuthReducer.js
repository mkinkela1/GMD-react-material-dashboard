import { AUTH } from '../constants/AuthConstants';

const initialState = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action) {
  switch(action.type) {
    case AUTH:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = state => state.authReducer.isAuthenticated;
