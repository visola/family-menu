import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { loadMeals } from '../actions/Meals';

class MealsTable extends React.Component {
  componentDidMount() {
    this.props.loadMeals();
  }

  render() {
    return <p>This is the meals table.</p>;
  }
}

MealsTable.propTypes = {
  loadMeals: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadMeals: () => dispatch(loadMeals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealsTable);
