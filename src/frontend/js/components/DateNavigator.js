import Button from 'react-bootstrap/lib/Button';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

@inject('dateRange')
@observer
export default class DateNavigator extends React.Component {
  static propTypes = {
    dateRange: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrevious = this.handleClickPrevious.bind(this);
    this.handleClickToday = this.handleClickToday.bind(this);
  }

  handleClickNext() {
    this.props.dateRange.offsetBy(7);
  }

  handleClickPrevious() {
    this.props.dateRange.offsetBy(-7);
  }

  handleClickToday() {
    this.props.dateRange.goToToday();
  }

  render() {
    return  <div className="date-navigator">
      <Button onClick={this.handleClickPrevious}>&lt; Previous</Button>
      &nbsp;|&nbsp;
      <Button onClick={this.handleClickToday}>Today</Button>
      &nbsp;|&nbsp;
      <Button onClick={this.handleClickNext}>Next &gt;</Button>
    </div>
  }
}
