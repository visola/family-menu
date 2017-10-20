import axios from 'axios';

import { loadDishes } from '../actions/Dishes';
import { loadMeals } from '../actions/Meals';
import { loadPeople } from '../actions/People';


export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';

export const CREATE_FAMILY_REQUESTED = 'CREATE_FAMILY_REQUESTED';
export const CREATE_FAMILY_SUCCESSFUL = 'CREATE_FAMILY_SUCCESSFUL';
export const CREATE_FAMILY_FAILED = 'CREATE_FAMILY_FAILED';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function checkLoggedIn() {
  return (dispatch) => {
    dispatch({ type: CHECK_LOGGED_IN });
    dispatch(loadPeople());
    dispatch(loadMeals());
    dispatch(loadDishes());
  };
}

export function create(family) {
  return (dispatch) => {
    dispatch({ type: CREATE_FAMILY_REQUESTED, ...family });

    return axios.post('/api/v1/families', family)
      .then(() => {
        dispatch({ type: CREATE_FAMILY_SUCCESSFUL, family });
        dispatch(login(family));
      })
      .catch((error) => {
        let message = 'Sorry, an error occured while trying to create your family.';
        if (error.response
          && error.response.status === 400
          && error.response.data
          && error.response.data.error === true) {
          ({ message } = error.response.data);
        }
        dispatch({ type: CREATE_FAMILY_FAILED, message });
      });
  };
}

export function login(loginRequest) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUESTED, ...loginRequest });

    return axios.post('/api/v1/login', loginRequest)
      .then((response) => {
        dispatch({ type: LOGIN_SUCCESSFUL, token: response.data.token });
        dispatch(checkLoggedIn());
      })
      .catch((error) => {
        if (error.response
          && error.response.status === 403
          && error.response.data.exception === 'org.springframework.security.authentication.BadCredentialsException') {
          dispatch({ type: LOGIN_FAILED, message: 'Wrong family name/password combination.' });
        } else {
          dispatch({ type: LOGIN_FAILED, message: 'Sorry, an error occured while trying to log you in.' });
        }
      });
  };
}
