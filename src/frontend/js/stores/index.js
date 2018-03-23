import { autorun } from 'mobx';

import DateRange from './DateRange';
import Meals from './Meals';
import People from './People';
import PlannedMeals from './PlannedMeals';
import Security from './Security';

const dateRange = new DateRange();
const people = new People();
const security = new Security();

const meals = new Meals(dateRange);
const plannedMeals = new PlannedMeals(dateRange);

security.checkLoggedIn();
autorun(() => {
  if (security.isLoggedIn) {
    meals.fetch();
    plannedMeals.fetch();
  }
})

export default {
  dateRange,
  meals,
  people,
  plannedMeals,
  security,
}