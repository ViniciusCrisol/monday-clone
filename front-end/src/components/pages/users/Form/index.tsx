import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiPaperclip, FiMail, FiLock, FiUser } from 'react-icons/fi';

import api from '@libs/services/api';
import errorMessages from '@libs/helpers/errorMessages';
import validateErrors from '@libs/services/validateErrors';

import Input from '@components/Input';
import Button from '@components/Button';
import FormError from '@components/FormError';

import Banner from './Banner';
import { Container } from './styles';

interface IFormData {
  user_name: string;
  user_email: string;
  account_name: string;
  password: string;
  confirm_password: string;
}

const CreateAccountForm: React.FC = () => {
  const router = useRouter();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(async (data: IFormData) => {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        user_name: Yup.string().required(errorMessages.userNameRequired),
        account_name: Yup.string().required(errorMessages.accountNameRquired),
        user_email: Yup.string().email().required(errorMessages.emailRequired),
        password: Yup.string().required(errorMessages.passwordRequired),
        confirm_password: Yup.string().oneOf(
          [Yup.ref('password'), null],
          errorMessages.passwordDoesNotMatch
        )
      });
      await schema.validate(data, { abortEarly: false });
      await api.post('/accounts', data);
      router.push('/auth/login');
    } catch (error) {
      const errorMessage = validateErrors(error);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  }, []);

  return (
    <Container onSubmit={handleSubmit} ref={formRef}>
      <div className="inputs-container">
        <h1>Create account</h1>

        <FormError message={errorMessage} />
        <Input icon={FiUser} name="user_name" placeholder="Full name" />
        <Input
          icon={FiPaperclip}
          name="account_name"
          placeholder="Account name"
        />
        <Input
          icon={FiMail}
          type="email"
          name="user_email"
          placeholder="Email address"
        />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Input
          icon={FiLock}
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
        />
        <Button loading={loading} isSquare type="submit">
          Register
        </Button>
        <Link href="/auth/login">
          <a>I already have an account.</a>
        </Link>
      </div>
      <Banner />
    </Container>
  );
};

export default CreateAccountForm;
