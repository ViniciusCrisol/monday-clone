import ejs from 'ejs';
import puppeteer from 'puppeteer';

import AppError from '../../errors/AppError';
import DocumentRepository from '../repositories/documents/DocumentRepository';

import { templateError, defaultError } from '../../errors/messages';

class DocumentsController {
  async create(request, response) {
    const { id } = request.params;
    const { template } = request.body;

    const documentRepository = new DocumentRepository();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const templateExists = documentRepository.getDocumentTemplate(template);
    if (!templateExists) {
      throw new AppError(templateError.message, templateError.status);
    }

    const documentContent = await documentRepository.getDocumentData(
      id,
      template
    );
    if (!documentContent) {
      throw new AppError(defaultError.message, defaultError.status);
    }

    const documentUrl = documentRepository.getDocumentUrl({
      ...documentContent,
      template,
    });
    await page.goto(documentUrl, { waitUntil: 'networkidle0' });

    const document = await page.pdf({
      printBackground: true,
      format: 'Letter',
    });
    await browser.close();

    response.contentType('application/pdf');
    return response.send(document);
  }

  async get(request, response) {
    const { data } = request.params;
    const documentData = JSON.parse(data);

    const documentRepository = new DocumentRepository();

    ejs.renderFile(
      documentRepository.getDocumentTemplate(documentData.template),
      documentData,
      (error, html) => {
        if (error) return templateError.message;
        return response.send(html);
      }
    );
  }
}

export default new DocumentsController();
