import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { createPlannedMeal, savePlannedMeal } from '../actions/PlannedMeals';
import MealsTable from '../components/MealsTable';

class Meals extends React.Component {
  handlePlannedMealChanged(plannedMeal) {
    if (plannedMeal.id) {
      this.props.onPlannedMealChanged(plannedMeal);
    } else {
      this.props.onPlannedMealCreated(plannedMeal);
    }
  }

  render() {
    return <MealsTable
      endDate={this.props.endDate}
      meals={this.props.meals}
      onPlannedMealChanged={this.handlePlannedMealChanged.bind(this)}
      people={this.props.people}
      plannedMeals={this.props.plannedMeals}
      startDate={this.props.startDate}
    />;
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
