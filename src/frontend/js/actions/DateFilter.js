import { loadPlannedMeals } from './PlannedMeals';

export const FILTER_DATES = 'FILTER_DATES';

export function changeDates(start, end) {
  return (dispatch) => {
    dispatch({ type: FILTER_DATES, start, end });
    dispatch(loadPlannedMeals(start, end));
  };
}
