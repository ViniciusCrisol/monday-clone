import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { mondayLogo } from '../../utils/files';
import {
  Header,
  Container,
  FormContainer
} from '../../styles/pages/auth/login';

interface formData {
  user_name: string;
  user_email: string;
  account_name: string;
  password: string;
  confirm_password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: formData) => {
    console.log(data);
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

          <Input icon={FiMail} name="user_email" placeholder="Email address" />
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

export default Login;
