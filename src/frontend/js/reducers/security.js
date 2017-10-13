import {
  CHECK_LOGGED_IN,
  CREATE_FAMILY_REQUESTED,
  CREATE_FAMILY_SUCCSSFUL,
  CREATE_FAMILY_FAILED,
  LOGIN_REQUESTED,
  LOGIN_SUCCSSFUL,
  LOGIN_FAILED,
} from '../actions/Security';

function checkLoggedIn() {
  const token = localStorage.getItem('token');
  if (token == null) {
    return { loggedIn: false, family: null };
  }
  return loggedInUser(token);
}

function loggedInUser(token) {
  return {
    loggedIn: true,
    family: JSON.parse(atob(token.split('.')[1])).sub,
  };
}

function logUserIn(token) {
  localStorage.setItem('token', token);
  return loggedInUser(token);
}

const defaultState = {
  creating: false,
  loggingIn: false,
  loggedIn: false,
  family: null,
};

export function security(state = defaultState, action) {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return Object.assign({}, state, checkLoggedIn(state));

    case CREATE_FAMILY_REQUESTED:
      return Object.assign({}, state, { creating: true });

    case CREATE_FAMILY_SUCCSSFUL:
      return Object.assign({}, state, { creating: false, family: action.family });

    case CREATE_FAMILY_FAILED:
      return Object.assign({}, state, { creating: false, createError: action.message });

    case LOGIN_REQUESTED:
      return Object.assign({}, state, { loggingIn: true });

    case LOGIN_SUCCSSFUL:
      return Object.assign({}, state, { loggingIn: false, ...logUserIn(action.token) });

    case LOGIN_FAILED:
      return Object.assign({}, state, { loggingIn: false, loggingError: action.message });

    default:
      return state;
  }
}
