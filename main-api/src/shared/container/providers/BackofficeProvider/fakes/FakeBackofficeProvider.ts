import IBackofficeProvider from '../models/IBackofficeProvider';

class FakeBackofficeProvider implements IBackofficeProvider {
  public async sendWelcomeMail(userId: string): Promise<void> {
    const emailMessage = `Welcome ${userId}!`;
    return emailMessage ? undefined : undefined;
  }
}

export default FakeBackofficeProvider;
