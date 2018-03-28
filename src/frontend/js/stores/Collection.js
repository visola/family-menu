import axios from 'axios';
import { action, observable } from 'mobx';

import constants from '../constants';

export default class Collection {
  @observable collection = [];
  @observable loading = true;
  @observable saving = true;

  @action
  fetch() {
    this.loading = true;
    return axios.get(`${constants.apiRoot}/${this.url}`)
        .then(({data}) => this.setCollection(data.content))
        .catch((error) => this.setError(error));
  }

  get length() {
    return this.collection.length;
  }

  get url() {
    throw new Error("Abstract model class.");
  }

  find(callback) {
    return this.collection.find(callback);
  }

  forEach(callback) {
    this.collection.forEach(callback);
  }

  map(callback) {
    return this.collection.map(callback);
  }

  processOne(receivedData) {
    return receivedData;
  }

  @action
  push(model) {
    this.collection.push(model);
    this.resetState();
  }

  @action
  resetState() {
    this.loading = false;
    this.saving = false;
  }

  @action
  saveOne(data) {
    this.saving = true;
    if (data.id == null) {
      return axios.post(`${constants.apiRoot}/${this.url}`, data)
        .then(({data}) => this.push(this.processOne(data)))
        .catch((error) => this.setError(error));
    }

    const index = this.collection.findIndex((m) => m.id === data.id);
    let model = this.collection[index];
    model = Object.assign({}, model, data);
    return axios.put(`${constants.apiRoot}/${this.url}/${model.id}`, data)
            .then(({data}) => this.setModel(this.processOne(data), index))
            .catch((error) => this.setError(error));
  }

  @action
  setCollection(newCollection) {
    this.collection = (newCollection || []).map((d) => this.processOne(d));
    this.resetState();
  }

  @action
  setError(error) {
    console.log(error);
    console.log("Response is: ", error.response);
    let message = error.message;
    if (error && error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    this.error = message;
    this.resetState();
  }

  @action
  setModel(model, index) {
    this.collection[index] = model;
    this.resetState();
  }
}
