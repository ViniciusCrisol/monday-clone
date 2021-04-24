import * as Yup from 'yup';
import { baseErrorMessages } from '../utils/errorMessages';

interface YupErrors {
  message: string;
}

function getYupErrors(error: Yup.ValidationError): YupErrors[] {
  const validationErrors = [];

  error.inner.forEach(error => {
    validationErrors.push({ message: error.message });
  });

  return validationErrors;
}

function getFormErrorMessage(error): string {
  const { defaulMessage, fillAllFields } = baseErrorMessages;

  if (error instanceof Yup.ValidationError) {
    const yupErrors = getYupErrors(error);
    return yupErrors.length > 1 ? fillAllFields : yupErrors[0].message;
  }

  return error.response.data.message || defaulMessage;
}

export default getFormErrorMessage;
