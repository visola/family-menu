import axios from 'axios';

export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_SUCCSSFUL = 'LOGIN_SUCCSSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function checkLoggedIn() {
  return { type: CHECK_LOGGED_IN };
}

export function login(loginRequest) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUESTED, ...loginRequest });

    return axios.post('/api/v1/login', loginRequest)
      .then((response) => {
        dispatch({ type: LOGIN_SUCCSSFUL, token: response.data.token });
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
