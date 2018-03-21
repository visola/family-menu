import DateRange from './DateRange';
import People from './People';
import PlannedMeals from './PlannedMeals';
import Security from './Security';

const dateRange = new DateRange();
const people = new People();
const security = new Security();

const plannedMeals = new PlannedMeals(dateRange);

export default {
  dateRange,
  people,
  plannedMeals,
  security,
}