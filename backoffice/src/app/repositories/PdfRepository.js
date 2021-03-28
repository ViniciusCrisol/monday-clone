import path from 'path';
import Account from '../models/Account';

class PdfRepository {
  #joinTemplatePath(fileName) {
    return path.join(__dirname, '..', 'views', 'documents', fileName);
  }

  getPdfUrl(data) {
    return `${process.env.BASE_URL}/pdf/${JSON.stringify(data)}`;
  }

  getPdfTemplate(template) {
    if (template === 'users-report') {
      return this.#joinTemplatePath('users_report.ejs');
    }
  }

  async getPdfData(id, template) {
    if (template === 'users-report') {
      const response = await Account.findByPk(id, {
        attributes: ['name'],
      });
      if (!response) return undefined;

      const { name } = response.dataValues;
      return { name };
    }
  }
}

export default new PdfRepository();
