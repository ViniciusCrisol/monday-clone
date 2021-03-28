import ejs from 'ejs';
import nodemailer from 'nodemailer';

import AppError from '../../errors/AppError';
import transporterConfig from '../../config/email';
import emailRepository from '../repositories/EmailRepository';
import { templateError, defaultError } from '../../errors/messages';

class EmailController {
  async create(request, response) {
    const { id } = request.params;
    const { template } = request.body;

    const emailConfig = emailRepository.getEmailConfig(template);
    if (!emailConfig) {
      throw new AppError(templateError.message, templateError.status);
    }

    const emailTemplate = emailRepository.getEmailTemplate(template);
    const transporter = nodemailer.createTransport(transporterConfig);

    const emailData = await emailRepository.getEmailData(id, template);
    if (!emailData) {
      throw new AppError(defaultError.message);
    }

    ejs.renderFile(emailTemplate, emailData, async (error, html) => {
      if (error) {
        throw new AppError(defaultError.message);
      }

      await transporter.sendMail({ ...emailConfig, to: emailData.to, html });
      return response.status(204).json();
    });
  }
}

export default new EmailController();
