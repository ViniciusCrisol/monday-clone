import errors from './errors';
type IErrors = keyof typeof errors;

export default class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(error: IErrors) {
    this.message = errors[error].message;
    this.statusCode = errors[error].status;
  }
}
