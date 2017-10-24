import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import PlannedMeal from '../containers/PlannedMeal';

class MealsTable extends React.Component {
  getDays() {
    const result = [];
    const beginOfWeek = moment().startOf('week');
    for (let i = 0; i < 7; i += 1) {
      result.push(beginOfWeek.clone().add(i, 'days'));
    }
    return result;
  }

  render() {
    const days = this.getDays();
    return <table className="table">
      <thead>{this.renderDays(days)}</thead>
      <tbody>
        {this.renderTableBody(days)}
      </tbody>
    </table>;
  }

  renderDays(days) {
    return <tr>
      <th key={-1}>&nbsp;</th>
      {days.map((day) => <th key={day}>{day.format('ddd (MM/DD)')}</th>)}
    </tr>;
  }

  renderMeal(day, meal) {
    return this.props.people
      .map((person) => this.renderMealForPerson(day, meal, person));
  }

  renderMealForPerson(day, meal, person) {
    const plannedMeal = _.find(this.props.plannedMeals, (plannedMeal) => {
      plannedMeal.person.id == person.id && plannedMeal.plannedDate == day.unix();
    });
    return <PlannedMeal
        key={person.id}
        day={day}
        meal={meal}
        person={person}
      />
  }

  renderTableBody(days) {
    const result = [];
    this.props.meals.forEach((meal) => {
      const cellsInRow = [<td key={-1}>{meal.name}</td>];
      days.forEach((day) => {
        cellsInRow.push(<td key={day}>
          {this.renderMeal(day, meal)}
        </td>);
      });
      result.push(<tr className={`meal ${meal.name}`} key={meal.id}>{cellsInRow}</tr>);
    });
    return result;
  }
}

MealsTable.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
  plannedMeals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    plannedDate: PropTypes.number.required,
    dishes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.required,
      name: PropTypes.string.required,
    }))
  })).isRequired
};

export default MealsTable;
