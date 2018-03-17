import Model from './Model';

export default class Family extends Model {
  constructor() {
    super({
      email: '',
      name: '',
      password: '',
    });
  }

  get url() {
    return 'families';
  }
}
