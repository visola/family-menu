import { action, observable } from 'mobx';
import moment from 'moment';

export default class DateRange {
  @observable end;
  @observable start;

  constructor() {
    this.goToToday();
  }

  @action
  goToToday() {
    this.start = moment().startOf('week');
    this.end = this.start.clone().add(7, 'days');
  }

  @action
  offsetBy(days) {
    this.start = this.start.clone().add(days, 'days');
    this.end = this.start.clone().add(7, 'days');
  }
}