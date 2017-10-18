import { combineReducers } from 'redux';

import * as meals from './meals';
import * as people from './people';
import * as security from './security';

const familyMenuApp = combineReducers({
  ...meals,
  ...people,
  ...security,
});

export default familyMenuApp;
