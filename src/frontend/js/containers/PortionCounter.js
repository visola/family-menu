import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class PortionCounter extends React.Component {
  render() {
    return <div className="portion-counter">
      <h3>Portions this week:</h3>
      <ul>
        {this.renderPortions()}
      </ul>
    </div>;
  }

  renderPortionCount(dish, count) {
    return <li key={dish.id}>
      {dish.name}: {count}x
    </li>;
  }

  renderPortions() {
    const portionCountByDishName = {};
    this.props.plannedMeals.forEach((plannedMeal) => {
      plannedMeal.dishes.forEach((dish) => {
        let countContainer = portionCountByDishName[dish.name] || { count: 0, dish };
        countContainer.count += 1;
        portionCountByDishName[dish.name] = countContainer;
      });
    });
    return Object.values(portionCountByDishName)
      .sort((c1, c2) => c2.count - c1.count)
      .map((c) => this.renderPortionCount(c.dish, c.count));
  }
}

PortionCounter.propTypes = {
  plannedMeals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    plannedDate: PropTypes.object.isRequired,
    dishes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
  })).isRequired,
};

const mapStateToProps = (state) => {
  return {
    plannedMeals: state.plannedMeals.list,
  };
};

export default connect(mapStateToProps)(PortionCounter);
