
export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';

export function checkLoggedIn() {
  return { type: CHECK_LOGGED_IN };
}

export function login(familyName, password) {
  return { type: LOGIN_REQUESTED, familyName, password };
}
