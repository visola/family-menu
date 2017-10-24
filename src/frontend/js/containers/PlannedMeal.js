import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Minus, Plus } from 'react-bytesize-icons';

import ListPicker from '../components/ListPicker';

class PlannedMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingDish: false
    };
  }

  handleAddDish(dish) {
    console.log(dish);
    this.setState({addingDish: false});
  }

  handleStartAddingDish(e) {
    e.preventDefault();
    this.setState({addingDish: true});
  }

  render() {
    return <div className="meal">
      {this.props.person.name} <Button className="icon-button" onClick={this.handleStartAddingDish.bind(this)}>
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
        <ListPicker
          onCancel={() => this.setState({addingDish: false})}
          onSelect={this.handleAddDish.bind(this)}
          values={this.props.dishes}
        />
      </li>
    }
    return null;
  }

  renderPlannedDishes() {
    if (this.props.plannedMeal) {
      return this.props.plannedMeal.dishes.map((dish) => <li>
      </li>);
    }
    return null;
  }
}

PlannedMeal.propTypes = {
  day: PropTypes.object.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
  meal: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
  person: PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  }).isRequired,
  plannedMeal: PropTypes.shape({
    id: PropTypes.number.required,
    plannedDate: PropTypes.number.required,
    dishes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.required,
      name: PropTypes.string.required,
    })).isRequired
  })
};

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes.list,
  };
};

export default connect(mapStateToProps)(PlannedMeal);
