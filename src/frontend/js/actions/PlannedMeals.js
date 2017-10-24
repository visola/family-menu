import axios from 'axios';

export const LOAD_PLANNED_MEALS_REQUEST = 'LOAD_PLANNED_MEALS_REQUEST';
export const LOAD_PLANNED_MEALS_SUCCESSFUL = 'LOAD_PLANNED_MEALS_SUCCESSFUL';
export const LOAD_PLANNED_MEALS_FAILURE = 'LOAD_PLANNED_MEALS_FAILURE';

export function loadPlannedMeals() {
  return (dispatch) => {
    dispatch({ type: LOAD_PLANNED_MEALS_REQUEST });

    return axios.get('/api/v1/plannedMeals')
      .then((response) => {
        dispatch({ type: LOAD_PLANNED_MEALS_SUCCESSFUL, plannedMeals: response.data.content });
      }).catch((error) => {
        dispatch({ type: LOAD_PLANNED_MEALS_FAILURE, error });
      });
  };
}
