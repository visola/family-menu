import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { createPlannedMeal, savePlannedMeal } from '../actions/PlannedMeals';
import MealsTable from '../components/MealsTable';

class Meals extends React.Component {
  handlePlannedMealChanged(plannedMeal) {
    console.log(plannedMeal);
    if (plannedMeal.id) {
      this.props.onPlannedMealChanged(plannedMeal);
    } else {
      this.props.onPlannedMealCreated(plannedMeal);
    }
  }

  render() {
    return <MealsTable
      meals={this.props.meals}
      onPlannedMealChanged={this.handlePlannedMealChanged.bind(this)}
      people={this.props.people}
      plannedMeals={this.props.plannedMeals}
    />;
  }
}

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
  onPlannedMealCreated: PropTypes.func.isRequired,
  onPlannedMealChanged: PropTypes.func.isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals.list,
    people: state.people.list,
    plannedMeals: state.plannedMeals.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPlannedMealCreated: (plannedMeal) => dispatch(createPlannedMeal(plannedMeal)),
    onPlannedMealChanged: (plannedMeal) => dispatch(savePlannedMeal(plannedMeal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
