import {
  LOAD_PLANNED_MEALS_REQUEST,
  LOAD_PLANNED_MEALS_SUCCESSFUL,
  LOAD_PLANNED_MEALS_FAILURE,
} from '../actions/PlannedMeals';

const defaultState = {
  loading: false,
  list: [],
};

export function plannedMeals(state = defaultState, action) {
  switch (action.type) {
    case LOAD_PLANNED_MEALS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case LOAD_PLANNED_MEALS_SUCCESSFUL:
      return Object.assign({}, state, { loading: false, list: action.plannedMeals });

    case LOAD_PLANNED_MEALS_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.error });

    default:
      return state;
  }
}
