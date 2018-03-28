import axios from 'axios';
import { action, reaction } from 'mobx';
import moment from 'moment';

import Collection from './Collection';

export default class PlannedMeals extends Collection {
  constructor(dateRange) {
    super();
    this.dateRange = dateRange;
    reaction(() => dateRange.interval, (interval) => this.fetch(interval));
  }

  @action
  fetch(interval) {
    this.loading = true;
    axios.get('/api/v1/plannedMeals', { params: interval })
      .then(({data}) => this.setCollection(data.content))
      .catch((error) => this.setError(error));
  }

  get url() {
    return 'plannedMeals';
  }

  processOne(receivedData) {
    return Object.assign({}, receivedData, {
      plannedDate: moment(receivedData.plannedDate),
    });
  }

}