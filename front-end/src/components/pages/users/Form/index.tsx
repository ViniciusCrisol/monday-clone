import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiPaperclip, FiMail, FiLock, FiUser } from 'react-icons/fi';

import api from '@services/api';
import errorMessages from '@utils/errorMessages';
import validateErrors from '@libs/validateErrors';

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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(async (data: IFormData) => {
    try {
      const { emailRequired, passwordRequired } = errorMessages;

      const schema = Yup.object().shape({
        user_name: Yup.string().required(emailRequired),
        account_name: Yup.string().required(emailRequired),
        user_email: Yup.string().email().required(emailRequired),
        password: Yup.string().required(passwordRequired),
        confirm_password: Yup.string()
          .required(passwordRequired)
          .oneOf([Yup.ref('password'), null], passwordRequired)
      });

      console.log(data);

      await schema.validate(data, { abortEarly: false });
      const response = await api.post('/accounts', data);

      console.log(response.data);

      // router.push('/auth/login');
    } catch (error) {
      const errorMessage = validateErrors(error);
      setErrorMessage(errorMessage);
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
        <Button isSquare type="submit">
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
