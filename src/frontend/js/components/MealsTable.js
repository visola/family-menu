import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import Meal from './Meal';

class MealsTable extends React.Component {
  getDays() {
    const result = [];
    const beginOfWeek = moment().startOf('week');
    for (let i = 0; i < 7; i += 1) {
      result.push(beginOfWeek.clone().add(i, 'days'));
    }
    return result;
  }

  render() {
    const days = this.getDays();
    return <table className="table">
      <thead>{this.renderDays(days)}</thead>
      <tbody>
        {this.renderTableBody(days)}
      </tbody>
    </table>;
  }

  renderDays(days) {
    return <tr>
      <td key={-1}>&nbsp;</td>
      {days.map((day) => <th key={day}>{day.format('ddd (MM/DD)')}</th>)}
    </tr>;
  }

  renderTableBody(days) {
    const result = [];
    this.props.meals.forEach((meal) => {
      const cellsInRow = [<td key={-1}>{meal.name}</td>];
      days.forEach((day) => {
        cellsInRow.push(<td key={day}>
          <Meal day={day} meal={meal} people={this.props.people} />
        </td>);
      });
      result.push(<tr className={`meal ${meal.name}`} key={meal.id}>{cellsInRow}</tr>);
    });
    return result;
  }
}

MealsTable.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
  people: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.required,
    name: PropTypes.string.required,
  })).isRequired,
};

export default MealsTable;
