import {
  LOAD_DISHES_REQUEST,
  LOAD_DISHES_SUCCESSFUL,
  LOAD_DISHES_FAILURE,
} from '../actions/Dishes';

const defaultState = {
  loading: false,
  list: [],
};

export function dishes(state = defaultState, action) {
  switch (action.type) {
    case LOAD_DISHES_REQUEST:
      return Object.assign({}, state, { loading: true });

    case LOAD_DISHES_SUCCESSFUL:
      return Object.assign({}, state, { loading: false, list: action.dishes });

    case LOAD_DISHES_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.error });

    default:
      return state;
  }
}
