import Sequelize from 'sequelize';
import databaseCongfig from '../config/database';

import Account from '../app/models/Account';

const models = [Account];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseCongfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
