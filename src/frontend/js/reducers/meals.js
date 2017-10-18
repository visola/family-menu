import {
  LOAD_MEALS_REQUEST,
  LOAD_MEALS_SUCCESSFUL,
  LOAD_MEALS_FAILURE,
} from '../actions/Meals';

const defaultState = {
  loading: false,
  list: [],
};

export function meals(state = defaultState, action) {
  switch (action.type) {
    case LOAD_MEALS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case LOAD_MEALS_SUCCESSFUL:
      return Object.assign({}, state, { loading: false, list: action.meals });

    case LOAD_MEALS_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.error });

    default:
      return state;
  }
}
