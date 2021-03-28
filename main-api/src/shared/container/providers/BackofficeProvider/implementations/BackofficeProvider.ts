import axios from 'axios';
import { injectable } from 'tsyringe';
import IBackofficeProvider from '../models/IBackofficeProvider';

@injectable()
export default class MailProvider implements IBackofficeProvider {
  public async sendWelcomeMail(userId: string): Promise<void> {
    axios.post(`${process.env.SECONDARY_API_URL}/send/email/${userId}`, {
      template: 'welcome',
    });
  }
}
