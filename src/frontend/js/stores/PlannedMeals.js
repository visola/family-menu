import axios from 'axios';
import { action, reaction } from 'mobx';

import Collection from './Collection';

export default class PlannedMeals extends Collection {
  constructor(dateRange) {
    super();
    this.dateRange = dateRange;
    reaction(() => dateRange.interval, (interval) => this.fetch(interval));
  }

  @action
  fetch(interval) {
    axios.get('/api/v1/plannedMeals', { params: interval })
      .then(({data}) => this.setCollection(data.content))
      .catch((error) => this.setError(error));
  }

  get url() {
    return 'plannedMeals';
  }

}