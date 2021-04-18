import path from 'path';
import Account from '../../models/Account';

class EmailConfig {
  constructor() {
    this.templates = {
      welcome: {
        path: this.joinTemplatePath('welcome.ejs'),
        config: this.getTemplateConfig("Monday's Team - Welcome message!"),
        getData: async (user_id) => {
          const queryParams = { attributes: ['user_name', 'user_email'] };
          const response = await Account.findByPk(user_id, queryParams);
          if (!response) return undefined;

          const { user_name, user_email } = response.dataValues;
          return { name: user_name, to: user_email };
        },
      },
    };
  }

  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', '..', 'views', 'emails', fileName);
  }

  getTemplateConfig(subject) {
    return { subject, from: 'services-boilerplate@github.com' };
  }
}

export default EmailConfig;
