import { inject, observer } from 'mobx-react';
import React from 'react';

import PlannedMeal from './PlannedMeal';

@inject('dateRange', 'meals', 'people', 'plannedMeals')
@observer
export default class Meals extends React.Component {
  handlePlannedMealChanged(plannedMeal) {
    this.props.plannedMeals.saveOne(plannedMeal);
  }

  render () {
    const { days } = this.props.dateRange;

    if (this.props.meals.loading || this.props.people.loading) {
      return <p>Loading...</p>;
    }

    return <table className="meals-table table">
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
    const plannedMeal = this.props.plannedMeals.find((p) => {
      return p.person.id === person.id
        && p.meal.id === meal.id
        && p.plannedDate.isSame(day, 'day');
      });
      return <PlannedMeal
        key={person.id}
        day={day}
        meal={meal}
        onPlannedMealChanged={this.handlePlannedMealChanged.bind(this)}
        person={person}
        plannedMeal={plannedMeal}
      />;
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