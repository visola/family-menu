import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class PlannedMeal extends React.Component {
  render() {
    return <div></div>;
  }
}

PlannedMeal.propTypes = {
  day: PropTypes.object.isRequired,
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.required,
      name: PropTypes.string.required,
    })
  ).isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes.list,
  };
};

export default connect(mapStateToProps)(PlannedMeal);
