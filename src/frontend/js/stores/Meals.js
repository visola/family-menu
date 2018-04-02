import axios from 'axios';
import { action, reaction } from 'mobx';

import Collection from './Collection';

export default class Meals extends Collection {
  constructor(dateRange) {
    super();
    this.dateRange = dateRange;
    reaction(() => dateRange.interval, (interval) => this.fetch(interval));
  }

  @action
  fetch(interval) {
    this.loading = true;
    axios.get('/api/v1/meals', { params: interval })
      .then(({ data }) => this.setCollection(data.content))
      .catch((error) => this.setError(error));
  }

  get url() {
    return 'meals';
  }
}
