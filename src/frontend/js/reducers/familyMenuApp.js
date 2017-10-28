import { combineReducers } from 'redux';

import * as dateFilter from './dateFilter';
import * as dishes from './dishes';
import * as meals from './meals';
import * as people from './people';
import * as plannedMeals from './plannedMeals';
import * as security from './security';

const familyMenuApp = combineReducers({
  ...dateFilter,
  ...dishes,
  ...meals,
  ...people,
  ...plannedMeals,
  ...security,
});

export default familyMenuApp;
