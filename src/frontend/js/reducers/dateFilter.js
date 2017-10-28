import moment from 'moment';

import {
  FILTER_DATES
} from '../actions/DateFilter';

const beginOfWeek = moment().startOf('week');

const defaultState = {
  start: beginOfWeek,
  end: beginOfWeek.clone().add(7, 'days')
};

export function dateFilter(state = defaultState, action) {
  const { end, start } = action;
  switch (action.type) {
    case FILTER_DATES:
      return Object.assign({}, state, { end, start });

    default:
      return state;
  }
}
