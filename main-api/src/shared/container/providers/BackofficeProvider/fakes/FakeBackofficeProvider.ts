import IBackofficeProvider from '../models/IBackofficeProvider';

class BackofficeProvider implements IBackofficeProvider {
  public async sendWelcomeMail(): Promise<void> {}
}

export default BackofficeProvider;
