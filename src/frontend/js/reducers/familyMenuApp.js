import { combineReducers } from 'redux';

import * as people from './people';
import * as security from './security';

const familyMenuApp = combineReducers({
  ...people,
  ...security,
});

export default familyMenuApp;
