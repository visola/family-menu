import { autorun } from 'mobx';

import DateRange from './DateRange';
import Dishes from './Dishes';
import Meals from './Meals';
import People from './People';
import PlannedMeals from './PlannedMeals';
import Security from './Security';

const dateRange = new DateRange();
const dishes = new Dishes();
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
});

dishes.fetch();

export default {
  dateRange,
  dishes,
  meals,
  people,
  plannedMeals,
  security,
}