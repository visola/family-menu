import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

@inject('dateRange', 'plannedMeals')
@observer
export default class PortionCounter extends React.Component {
  static propTypes = {
    dateRange: PropTypes.object.isRequired,
    plannedMeals: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { dateRange, plannedMeals } = this.props;
    plannedMeals.fetch(dateRange.interval);
  }

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
    const { plannedMeals } = this.props;
    if (plannedMeals.length === 0) {
      return <span>No meals planned yet.</span>;
    }

    const portionCountByDishName = {};
    plannedMeals.forEach((plannedMeal) => {
      plannedMeal.dishes.forEach((dish) => {
        const countContainer = portionCountByDishName[dish.name] || { count: 0, dish };
        countContainer.count += 1;
        portionCountByDishName[dish.name] = countContainer;
      });
    });
    return Object.values(portionCountByDishName)
      .sort((c1, c2) => c2.count - c1.count)
      .map((c) => this.renderPortionCount(c.dish, c.count));
  }
}