import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        user_name: Sequelize.STRING,
        user_email: Sequelize.STRING,
        account_name: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        inserted_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
}

export default Account;
