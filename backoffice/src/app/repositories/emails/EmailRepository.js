import EmailConfig from './EmailConfig';

class EmailRepository {
  constructor() {
    const emailConfig = new EmailConfig();
    this.templates = emailConfig.templates;
  }

  getEmailTemplate(templateName) {
    const template = this.templates[templateName].path;
    return template;
  }

  getEmailConfig(templateName) {
    const templateConfig = this.templates[templateName].config;
    return templateConfig;
  }

  async getEmailData(user_id, template) {
    const templateData = await this.templates[template].getData(user_id);
    return templateData;
  }
}

export default EmailRepository;
