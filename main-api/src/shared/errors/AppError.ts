import errors from './errors';
type IErrors = keyof typeof errors;

export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(error: IErrors) {
    const { message, status } = errors[error];
    this.message = message;
    this.statusCode = status;
  }
}
