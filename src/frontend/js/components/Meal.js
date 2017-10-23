import PropTypes from 'prop-types';
import React from 'react';

import PlannedMeal from '../containers/PlannedMeal';

class Meal extends React.Component {
  render() {
    return <div>
      {this.props.people.map(this.renderMealForPerson.bind(this))}
    </div>;
  }

  renderMealForPerson(person) {
    return <PlannedMeal
      key={person.id}
      day={this.props.day}
      meal={this.props.meal}
      person={person}
    />;
  }
}

Meal.propTypes = {
  day: PropTypes.object.isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
};

export default Meal;
