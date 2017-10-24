import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import MealsTable from '../components/MealsTable';

class Meals extends React.Component {
  render() {
    return <MealsTable meals={this.props.meals} people={this.props.people} />;
  }
}

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
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

export default connect(mapStateToProps)(Meals);
