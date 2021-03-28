import path from 'path';
import Account from '../models/Account';

class EmailRepository {
  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'emails', fileName);
  }

  getEmailTemplate(template) {
    if (template === 'welcome') {
      return this.joinTemplatePath('welcome.ejs');
    }
  }

  async getEmailData(id, template) {
    if (template === 'welcome') {
      const response = await Account.findByPk(id, {
        attributes: ['user_name', 'user_email'],
      });
      if (!response) return undefined;

      const { user_name, user_email } = response.dataValues;
      return { name: user_name, to: user_email };
    }
  }

  getEmailConfig(template) {
    if (template === 'welcome') {
      return {
        from: 'services-boilerplate@github.com',
        subject: '<no-reply> Hello, welcome!',
      };
    }
  }
}

export default new EmailRepository();
