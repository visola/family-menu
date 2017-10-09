import {
  CHECK_LOGGED_IN,
  LOGIN_REQUESTED,
  LOGIN_SUCCSSFUL,
  LOGIN_FAILED,
} from '../actions/Security';

function checkLoggedIn() {
  const token = localStorage.getItem('token');
  if (token == null) {
    return { loggedIn: false, family: null };
  }
  return userLoggedIn(token);
}

function userLoggedIn(token) {
  localStorage.setItem('token', token);
  const data = JSON.parse(atob(token.split('.')[1]));
  return {
    loggedIn: true,
    family: data.sub,
  };
}

export function security(state = { loggingIn: false, loggedIn: false, family: null }, action) {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return Object.assign({}, state, checkLoggedIn(state));

    case LOGIN_REQUESTED:
      return Object.assign({}, state, { loggingIn: true });

    case LOGIN_SUCCSSFUL:
      return Object.assign({}, state, { loggingIn: false, ...userLoggedIn(action.token) });

    case LOGIN_FAILED:
      return Object.assign({}, state, { loggingIn: false, loggingError: action.message });

    default:
      return state;
  }
}
