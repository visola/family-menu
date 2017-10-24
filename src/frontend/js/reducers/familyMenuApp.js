import { combineReducers } from 'redux';

import * as dishes from './dishes';
import * as meals from './meals';
import * as people from './people';
import * as plannedMeals from './plannedMeals';
import * as security from './security';

const familyMenuApp = combineReducers({
  ...dishes,
  ...meals,
  ...people,
  ...plannedMeals,
  ...security,
});

export default familyMenuApp;
