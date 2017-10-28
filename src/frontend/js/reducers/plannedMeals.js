import moment from 'moment';

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
  let list;
  switch (action.type) {
    case LOAD_PLANNED_MEALS_REQUEST:
      return Object.assign({}, state, { loading: true });

    case LOAD_PLANNED_MEALS_SUCCESSFUL:
      list = action.plannedMeals.map((p) => {
        const newP = Object.assign({}, p, { plannedDate: moment(p.plannedDate).utc() });
        newP.dishes.sort((d1, d2) => d1.name.localeCompare(d2.name));
        return newP;
      });

      return Object
        .assign({}, state, { loading: false, list });

    case LOAD_PLANNED_MEALS_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.error });

    default:
      return state;
  }
}
