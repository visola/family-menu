import {
  CHECK_LOGGED_IN,
} from '../actions/Security';

function checkLoggedIn() {
  const token = localStorage.getItem('token');
  if (token == null) {
    return { loggedIn: false, family: null };
  }
  const data = JSON.parse(atob(token.split('.')[1]));
  return {
    loggedIn: true,
    family: data.sub,
  };
}

export function security(state = { loggedIn: false, family: null }, action) {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return Object.assign({}, state, checkLoggedIn(state));
    default:
      return state;
  }
}
