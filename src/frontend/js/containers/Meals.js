import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { createPlannedMeal, savePlannedMeal } from '../actions/PlannedMeals';
import PlannedMeal from '../components/PlannedMeal';

class Meals extends React.Component {
  getDays() {
    const { endDate, startDate } = this.props;
    const diff = endDate.diff(startDate, 'days');
    const result = [];
    for (let i = 0; i < diff; i += 1) {
      result.push(startDate.clone().add(i, 'days'));
    }
    return result;
  }

  handlePlannedMealChanged(plannedMeal) {
    if (plannedMeal.id) {
      this.props.onPlannedMealChanged(plannedMeal);
    } else {
      this.props.onPlannedMealCreated(plannedMeal);
    }
  }

  render() {
    const days = this.getDays();
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
    const plannedMeal = _.find(this.props.plannedMeals, (p) => {
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

Meals.propTypes = {
  endDate: PropTypes.object.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onPlannedMealCreated: PropTypes.func.isRequired,
  onPlannedMealChanged: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  plannedMeals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    plannedDate: PropTypes.object.isRequired,
    dishes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
  })).isRequired,
  startDate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    endDate: state.dateFilter.end,
    meals: state.meals.list,
    people: state.people.list,
    plannedMeals: state.plannedMeals.list,
    startDate: state.dateFilter.start,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlannedMealCreated: (plannedMeal) => dispatch(createPlannedMeal(plannedMeal)),
    onPlannedMealChanged: (plannedMeal) => dispatch(savePlannedMeal(plannedMeal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
