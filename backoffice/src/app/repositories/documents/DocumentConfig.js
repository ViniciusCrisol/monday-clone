import path from 'path';
import Account from '../../models/Account';

class DocumentConfig {
  constructor() {
    this.templates = {
      'users-report': {
        getData: this.getUsersReportData,
        path: this.joinTemplatePath('users_report.ejs'),
      },
    };
  }

  joinTemplatePath(fileName) {
    return path.join(__dirname, '..', '..', 'views', 'documents', fileName);
  }

  async getUsersReportData(user_id) {
    const queryParams = { attributes: ['user_name'] };

    const response = await Account.findByPk(user_id, queryParams);
    if (!response) return undefined;

    const { user_name } = response.dataValues;
    return { name: user_name };
  }
}

export default DocumentConfig;
