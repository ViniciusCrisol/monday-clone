import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        account_name: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Account;
