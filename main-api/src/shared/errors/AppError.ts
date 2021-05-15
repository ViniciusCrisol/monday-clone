import errors from './errors';

type Keys = keyof typeof errors;

class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(error: Keys) {
    const { message, status } = errors[error];

    this.message = message;
    this.statusCode = status;
  }
}

export default AppError;
