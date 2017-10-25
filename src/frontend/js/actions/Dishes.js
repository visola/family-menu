import axios from 'axios';

export const CREATE_DISH_REQUEST = 'CREATE_DISH_REQUEST';
export const CREATE_DISH_SUCCESSFUL = 'CREATE_DISH_SUCCESSFUL';
export const CREATE_DISH_FAILURE = 'CREATE_DISH_FAILURE';

export const LOAD_DISHES_REQUEST = 'LOAD_DISHES_REQUEST';
export const LOAD_DISHES_SUCCESSFUL = 'LOAD_DISHES_SUCCESSFUL';
export const LOAD_DISHES_FAILURE = 'LOAD_DISHES_FAILURE';

export function createDish(name) {
  return (dispatch) => {
    dispatch({ type: CREATE_DISH_REQUEST });

    return axios.post('/api/v1/dishes', { name })
      .then((response) => {
        dispatch({ type: CREATE_DISH_SUCCESSFUL, dishes: response.data.content });
        dispatch(loadDishes());
      }).catch((error) => {
        dispatch({ type: CREATE_DISH_FAILURE, error });
      });
  };
}

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
