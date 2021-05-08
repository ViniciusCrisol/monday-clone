import * as Yup from 'yup';
import errorMessages from '@utils/errorMessages';

interface IYupErrors {
  message: string;
}

function validateYupErrors(error: Yup.ValidationError): IYupErrors[] {
  const validationErrors = [];

  error.inner.forEach(error => {
    validationErrors.push({ message: error.message });
  });

  return validationErrors;
}

function validateErrors(error): string {
  const { defaultMessage, fillAllFields } = errorMessages;

  if (error instanceof Yup.ValidationError) {
    const yupErrors = validateYupErrors(error);
    return yupErrors.length > 1 ? fillAllFields : yupErrors[0].message;
  }

  return error.response.data.message || defaultMessage;
}

export default validateErrors;
