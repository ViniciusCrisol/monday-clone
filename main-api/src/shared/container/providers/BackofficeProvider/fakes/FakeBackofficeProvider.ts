import IBackofficeProvider from '../models/IBackofficeProvider';

class BackofficeProvider implements IBackofficeProvider {
  public async sendWelcomeMail(userId: string): Promise<void> {
    const emailMessage = `Welcome ${userId}!`;
    return emailMessage ? undefined : undefined;
  }
}

export default BackofficeProvider;
