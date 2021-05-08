import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import api from '@services/api';
import errorMessages from '@utils/errorMessages';
import validateErrors from '@libs/validateErrors';

import Input from '@components/Input';
import Button from '@components/Button';
import FormError from '@components/FormError';
import { setCookie } from '@services/cookies';

import { Container } from './styles';

interface IFormData {
  password: string;
  user_email: string;
}

const AuthForm: React.FC = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(async (data: IFormData) => {
    setLoading(true);
    try {
      const { emailRequired, passwordRequired } = errorMessages;

      const schema = Yup.object().shape({
        user_email: Yup.string().email().required(emailRequired),
        password: Yup.string().required(passwordRequired)
      });

      await schema.validate(data, { abortEarly: false });
      const response = await api.post('/accounts/session', data);

      setCookie('monday_user_token', response.data.token);
      router.push('/app');
    } catch (error) {
      const errorMessage = validateErrors(error);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <h1>Log in to your account</h1>

        <FormError message={errorMessage} />
        <Input
          icon={FiMail}
          name="user_email"
          type="email"
          placeholder="Email address"
        />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button loading={loading} type="submit">
          Next <FiArrowRight size={22} />
        </Button>
        <Link href="/users/create-account">
          <a>I don't have an account.</a>
        </Link>
      </Form>
    </Container>
  );
};

export default AuthForm;
