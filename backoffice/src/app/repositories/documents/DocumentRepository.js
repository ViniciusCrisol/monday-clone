import DocumentConfig from './DocumentConfig';

class DocumentRepository {
  constructor() {
    const documentConfig = new DocumentConfig();
    this.templates = documentConfig.templates;
  }

  getDocumentUrl(data) {
    return `${process.env.BASE_URL}/documents/${JSON.stringify(data)}`;
  }

  getDocumentTemplate(templateName) {
    const template = this.templates[templateName].path;
    return template;
  }

  async getDocumentData(user_id, templateName) {
    const templateData = await this.templates[templateName].getData(user_id);
    return templateData;
  }
}

export default DocumentRepository;
