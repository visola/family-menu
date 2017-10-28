import axios from 'axios';


export const CREATE_PLANNED_MEAL_REQUEST = 'CREATE_PLANNED_MEAL_REQUEST';
export const CREATE_PLANNED_MEAL_SUCCESSFUL = 'CREATE_PLANNED_MEAL_SUCCESSFUL';
export const CREATE_PLANNED_MEAL_FAILURE = 'CREATE_PLANNED_MEAL_FAILURE';

export const LOAD_PLANNED_MEALS_REQUEST = 'LOAD_PLANNED_MEALS_REQUEST';
export const LOAD_PLANNED_MEALS_SUCCESSFUL = 'LOAD_PLANNED_MEALS_SUCCESSFUL';
export const LOAD_PLANNED_MEALS_FAILURE = 'LOAD_PLANNED_MEALS_FAILURE';

export const SAVE_PLANNED_MEAL_REQUEST = 'SAVE_PLANNED_MEAL_REQUEST';
export const SAVE_PLANNED_MEAL_SUCCESSFUL = 'SAVE_PLANNED_MEAL_SUCCESSFUL';
export const SAVE_PLANNED_MEAL_FAILURE = 'SAVE_PLANNED_MEAL_FAILURE';

export function createPlannedMeal(plannedMeal) {
  return (dispatch) => {
    dispatch({ type: CREATE_PLANNED_MEAL_REQUEST });

    return axios.post('/api/v1/plannedMeals', plannedMeal)
      .then((response) => {
        dispatch({ type: CREATE_PLANNED_MEAL_SUCCESSFUL, plannedMeal: response.data.content });
        dispatch(loadPlannedMeals());
      }).catch((error) => {
        dispatch({ type: CREATE_PLANNED_MEAL_FAILURE, error });
      });
  };
}

export function loadPlannedMeals(start, end) {
  return (dispatch) => {
    let endString;
    let startString;
    if (start) {
      startString = start.toISOString();
    }
    if (end) {
      endString = end.toISOString();
    }

    dispatch({ type: LOAD_PLANNED_MEALS_REQUEST });

    return axios.get('/api/v1/plannedMeals', { params: { end: endString, start: startString } })
      .then((response) => {
        dispatch({ type: LOAD_PLANNED_MEALS_SUCCESSFUL, plannedMeals: response.data.content });
      }).catch((error) => {
        dispatch({ type: LOAD_PLANNED_MEALS_FAILURE, error });
      });
  };
}

export function savePlannedMeal(plannedMeal) {
  return (dispatch) => {
    dispatch({ type: SAVE_PLANNED_MEAL_REQUEST });

    return axios.put(`/api/v1/plannedMeals/${plannedMeal.id}`, plannedMeal)
      .then((response) => {
        dispatch({ type: SAVE_PLANNED_MEAL_SUCCESSFUL, plannedMeal: response.data.content });
        dispatch(loadPlannedMeals());
      }).catch((error) => {
        dispatch({ type: SAVE_PLANNED_MEAL_FAILURE, error });
      });
  };
}
