import axios from 'axios';

export const LOAD_MEALS_REQUEST = 'LOAD_MEALS_REQUEST';
export const LOAD_MEALS_SUCCESSFUL = 'LOAD_MEALS_SUCCESSFUL';
export const LOAD_MEALS_FAILURE = 'LOAD_MEALS_FAILURE';

export function loadMeals() {
  return (dispatch) => {
    dispatch({ type: LOAD_MEALS_REQUEST });

    return axios.get('/api/v1/meals')
      .then((response) => {
        dispatch({ type: LOAD_MEALS_SUCCESSFUL, meals: response.data.content });
      }).catch((error) => {
        dispatch({ type: LOAD_MEALS_FAILURE, error });
      });
  };
}
