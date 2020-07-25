import { CREATE_EVENT_EXPANSION } from '../../constants/ExpansionContants';

const initialState = {
  isVisible: false
}

export function createEventExpansionReducer(state = initialState, action) {
  switch(action.type) {
    case CREATE_EVENT_EXPANSION:
      return {
        ...state,
        isVisible: action.isVisible
      };
    default:
      return state;
  }
}

export const getVisibilityOfCreateEventExpansion = state => state.createEventExpansionReducer.isVisible;
