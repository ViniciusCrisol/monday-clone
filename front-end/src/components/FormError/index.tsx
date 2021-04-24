import { useState, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Container } from './styles';

interface FormErrorProps {
  message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  const [messageIsEmpty, setMessageIsEmpty] = useState(false);

  useEffect(() => {
    setMessageIsEmpty(message === '');
  }, [message]);

  return (
    <Container>
      {!messageIsEmpty && <FiAlertTriangle size={16} />}
      {message}
    </Container>
  );
};

export default FormError;
