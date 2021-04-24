import { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Cookie from 'js-cookie';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import api from '../../services/api';
import { mondayLogo } from '../../services/files';
import { userToken } from '../../utils/cookieNames';
import { loginErrorMessages } from '../../utils/errorMessages';
import getFormErrorMessage from '../../libs/getFormErrorMessage';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormError from '../../components/FormError';
import {
  Header,
  Container,
  FormContainer
} from '../../styles/pages/auth/login';

interface formData {
  password: string;
  user_email: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(async (data: formData) => {
    try {
      const { password, user_email } = loginErrorMessages;

      const schema = Yup.object().shape({
        user_email: Yup.string().email().required(user_email.required),
        password: Yup.string().required(password.required)
      });

      await schema.validate(data, { abortEarly: false });
      const response = await api.post('/accounts/session', data).then();

      Cookie.set(userToken, response.data.token);
      router.push('/app');
    } catch (error) {
      const errorMessage = getFormErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  }, []);

  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | Login</title>
      </Head>

      <Header>
        <img src={mondayLogo} alt="monday.com(logo)" />
      </Header>
      <FormContainer>
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
          <Button type="submit">
            Next <FiArrowRight size={22} />
          </Button>
          <Link href="/users/create-account">
            <a>I don't have an account.</a>
          </Link>
        </Form>
      </FormContainer>
    </Container>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token } = req.cookies;
//   if (token) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     };
//   }

//   return { props: {} };
// };

export default Login;
