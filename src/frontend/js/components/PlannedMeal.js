import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { Plus } from 'react-bytesize-icons';

import DishPicker from '../containers/DishPicker';

class PlannedMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDish: false,
      plannedMeal: this.getOrCreatePlannedMeal(props),
    };
  }

  componentWillReceiveProps(newProps) {
    const plannedMeal = this.getOrCreatePlannedMeal(newProps);
    this.setState({ plannedMeal });
  }

  getOrCreatePlannedMeal(props) {
    return props.plannedMeal || {
      dishes: [],
      meal: props.meal,
      person: props.person,
      plannedDate: props.day,
    };
  }

  handleAddDish(dish) {
    const { plannedMeal } = this.state;
    plannedMeal.dishes.push(dish);
    this.setState({ addingDish: false, plannedMeal });
    this.props.onPlannedMealChanged(plannedMeal);
  }

  handleStartAddingDish(e) {
    e.preventDefault();
    this.setState({ addingDish: true });
  }

  render() {
    return <div className="meal">
      {this.props.person.name}
        &nbsp;
        <Button className="icon-button" onClick={this.handleStartAddingDish.bind(this)}>
        <Plus height="16" width="16" />
      </Button>
      <ul>
        {this.renderPlannedDishes()}
        {this.renderAddDish()}
      </ul>
    </div>;
  }

  renderAddDish() {
    if (this.state.addingDish === true) {
      return <li>
        <DishPicker
          onCancel={() => this.setState({ addingDish: false })}
          onSelect={this.handleAddDish.bind(this)}
        />
      </li>;
    }
    return null;
  }

  renderPlannedDishes() {
    const { plannedMeal } = this.state;
    if (plannedMeal.dishes.length > 0) {
      return plannedMeal.dishes.map((dish) => <li key={dish.id}>{dish.name}</li>);
    }
    return null;
  }
}

PlannedMeal.propTypes = {
  day: PropTypes.object.isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onPlannedMealChanged: PropTypes.func.isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  plannedMeal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    plannedDate: PropTypes.object.isRequired,
    dishes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }),
};

export default PlannedMeal;
