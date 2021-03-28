import path from 'path';
import Account from '../models/Account';

class EmailRepository {
  #joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'emails', fileName);
  }

  getEmailTemplate(template) {
    if (template === 'welcome') {
      return this.#joinTemplatePath('welcome.ejs');
    }
  }

  async getEmailData(id, template) {
    if (template === 'welcome') {
      const response = await Account.findByPk(id, {
        attributes: ['name', 'email'],
      });
      if (!response) return undefined;

      const { name, email } = response.dataValues;
      return { name, to: email };
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
