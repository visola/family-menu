import { action, computed, observable } from 'mobx';
import moment from 'moment';

export default class DateRange {
  @observable end;
  @observable start;

  constructor() {
    this.goToToday();
  }

  @computed
  get days() {
    const { end, start } = this;
    const diff = end.diff(start, 'days');
    const result = [];
    for (let i = 0; i < diff; i += 1) {
      result.push(start.clone().add(i, 'days'));
    }
    return result;
  }

  @computed
  get interval() {
    return {
      start: this.start.toISOString(),
      end: this.end.toISOString(),
    };
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
