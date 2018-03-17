import { action, observable } from 'mobx';
import axios from 'axios';

import constants from '../constants';

export default class Model {
    @observable error = null;
    @observable loading = false;
    @observable saving = false;
    @observable model;

    constructor(defaultValues = {}) {
      this.model = defaultValues;
    }

    @action
    fetch() {
      this.loading = true;
      return axios.get(`${constants.apiRoot}/${this.url}/${this.model.id}`)
          .then(({data}) => this.setModel(data))
          .catch((error) => this.setError(error));
    }

    get url() {
      throw new Error("Abstract model class.");
    }

    @action
    save(extraData = {}) {
      this.saving = true;
      const model = Object.assign({}, this.model, extraData);

      // Optimistically update the model
      this.setModel(model);

      if (this.model.id == null) {
        return axios.post(`${constants.apiRoot}/${this.url}/`, model)
            .then(({data}) => this.setModel(data))
            .catch((error) => this.setError(error));
      }

      return axios.put(`${constants.apiRoot}/${this.url}/${this.model.id}`, model)
          .then(({data}) => this.setModel(data))
          .catch((error) => this.setError(error));
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
      this.loading = false;
      this.saving = false;
    }

    @action
    setModel(model) {
      this.model = model;
      this.loading = false;
      this.saving = false;
    }
}