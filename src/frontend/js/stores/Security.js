import axios from 'axios';
import { action, computed, observable } from 'mobx';

import constants from '../constants';

export default class Security {
  @observable loggingIn = false;
  @observable family = {};

  @action
  checkLoggedIn() {
    const token = localStorage['token'];
    this.family = {};
    if (token == null) {
      return;
    }

    const data = JSON.parse(atob(token.split('.')[1]));
    const expire = data.exp * 1000;
    if (expire < Date.now()) {
      return;
    }

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.family.name = data.sub;
  }

  @computed
  get isLoggedIn() {
    return this.family.name != null;
  }

  @action
  login(loginRequest) {
    this.loggingIn = true;
    return axios.post(`${constants.apiRoot}/login`, loginRequest)
      .then((response) => {
        localStorage['token'] = response.data.token;
        this.checkLoggedIn();
      });
  }

}