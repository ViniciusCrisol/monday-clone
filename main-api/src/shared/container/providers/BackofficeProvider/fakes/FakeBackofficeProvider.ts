import IBackofficeProvider from '../models/IBackofficeProvider';

export default class BackofficeProvider implements IBackofficeProvider {
  public async sendWelcomeMail(): Promise<void> {}
}
