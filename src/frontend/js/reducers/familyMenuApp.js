import { combineReducers } from 'redux';

import * as security from './security';

const familyMenuApp = combineReducers({
  ...security,
});

export default familyMenuApp;
