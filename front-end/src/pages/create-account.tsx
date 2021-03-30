import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiPaperclip, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Input from '../components/Input';
import Button from '../components/Button';
import { Container } from '../styles/pages/create-account';

interface formData {
  user_name: string;
  user_email: string;
  account_name: string;
  password: string;
  confirm_password: string;
}

const CreateAccount: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: formData) => {}, []);

  return (
    <>
      <Head>
        <title>monday.com: Create account</title>
      </Head>

      <Container>
        <div>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Create account </h1>
            <Input icon={FiUser} name="user_name" placeholder="Full name" />
            <Input
              icon={FiPaperclip}
              name="acccount_name"
              placeholder="Account name"
            />
            <Input
              icon={FiMail}
              name="user_email"
              placeholder="E-mail address"
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
            <Button type="submit">Register</Button>
            <Link href="/account/login">
              <a className="login">I already have an account.</a>
            </Link>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default CreateAccount;
