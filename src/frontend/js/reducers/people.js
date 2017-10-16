import {
  LOAD_PEOPLE_REQUEST,
  LOAD_PEOPLE_SUCCESSFUL,
  LOAD_PEOPLE_FAILURE,
} from '../actions/People';

const defaultState = {
  loading: false,
  list: [],
};

export function people(state = defaultState, action) {
  switch (action.type) {
    case LOAD_PEOPLE_REQUEST:
      return Object.assign({}, state, { loading: true });

    case LOAD_PEOPLE_SUCCESSFUL:
      return Object.assign({}, state, { loading: false, list: action.people });

    case LOAD_PEOPLE_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.error });

    default:
      return state;
  }
}
