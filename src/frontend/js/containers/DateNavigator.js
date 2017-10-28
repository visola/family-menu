import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { changeDates } from '../actions/DateFilter';

class DateNavigator extends React.Component {
  changeDates(offset) {
    const newStart = this.props.startDate.clone().add(offset, 'days');
    const newEnd = newStart.clone().add(7, 'days');
    this.props.changeDates(newStart, newEnd);
  }

  handleClickNext() {
    this.changeDates(7);
  }

  handleClickPrevious() {
    this.changeDates(-7);
  }

  handleClickToday() {
    const newStart = moment().startOf('week');
    const newEnd = newStart.clone().add(7, 'days');
    this.props.changeDates(newStart, newEnd);
  }

  render() {
    return <div className="date-navigator">
      <Button onClick={this.handleClickPrevious.bind(this)}>&lt; Previous</Button>
      &nbsp;|&nbsp;
      <Button onClick={this.handleClickToday.bind(this)}>Today</Button>
      &nbsp;|&nbsp;
      <Button onClick={this.handleClickNext.bind(this)}>Next &gt;</Button>
    </div>;
  }
}

DateNavigator.propTypes = {
  changeDates: PropTypes.func.isRequired,
  endDate: PropTypes.object.isRequired,
  startDate: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    endDate: state.dateFilter.end,
    startDate: state.dateFilter.start,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeDates: (start, end) => dispatch(changeDates(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateNavigator);
