export default interface IBackofficeProvider {
  sendWelcomeMail(userId: string): Promise<void>;
}
