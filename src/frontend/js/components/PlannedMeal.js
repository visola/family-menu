import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { Minus, Plus } from 'react-bytesize-icons';

import DishPicker from './DishPicker';

export default class PlannedMeal extends React.Component {
  static propTypes = {
    day: PropTypes.object.isRequired,
    meal: PropTypes.object.isRequired,
    onPlannedMealChanged: PropTypes.func.isRequired,
    person: PropTypes.object.isRequired,
    plannedMeal: PropTypes.object,
  };

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

  handleRemoveDish(dish) {
    const { plannedMeal } = this.state;
    _.remove(plannedMeal.dishes, (d) => d.id === dish.id);
    this.setState({ plannedMeal });
    this.props.onPlannedMealChanged(plannedMeal);
  }

  handleStartAddingDish(e) {
    e.preventDefault();
    this.setState({ addingDish: true });
  }

  render() {
    return <div className="meal">
        <span>{this.props.person.name}</span>
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

  renderDish(dish) {
    return <li key={dish.id}>
      {dish.name}
      &nbsp;
      <Button className="icon-button" onClick={this.handleRemoveDish.bind(this, dish)}>
        <Minus height="16" width="16" />
      </Button>
    </li>;
  }

  renderPlannedDishes() {
    const { plannedMeal } = this.state;
    if (plannedMeal.dishes.length > 0) {
      return plannedMeal.dishes.map(this.renderDish.bind(this));
    }
    return null;
  }
}
