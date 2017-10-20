import axios from 'axios';

export const LOAD_DISHES_REQUEST = 'LOAD_DISHES_REQUEST';
export const LOAD_DISHES_SUCCESSFUL = 'LOAD_DISHES_SUCCESSFUL';
export const LOAD_DISHES_FAILURE = 'LOAD_DISHES_FAILURE';

export function loadDishes() {
  return (dispatch) => {
    dispatch({ type: LOAD_DISHES_REQUEST });

    return axios.get('/api/v1/dishes')
      .then((response) => {
        dispatch({ type: LOAD_DISHES_SUCCESSFUL, dishes: response.data.content });
      }).catch((error) => {
        dispatch({ type: LOAD_DISHES_FAILURE, error });
      });
  };
}
