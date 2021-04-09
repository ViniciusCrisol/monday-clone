import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiPaperclip, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FakeDashboard from '../../components/FakeDashboard';
import { createAccountBanner } from '../../utils/files';
import {
  Container,
  FormContainer
} from '../../styles/pages/users/create-account';

interface formData {
  user_name: string;
  user_email: string;
  account_name: string;
  password: string;
  confirm_password: string;
}

const CreateAccount: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: formData) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | Create account</title>
      </Head>

      <FakeDashboard />
      <FormContainer>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className="inputs-container">
            <h1>Create account</h1>
            <Input icon={FiUser} name="user_name" placeholder="Full name" />
            <Input
              icon={FiPaperclip}
              name="acccount_name"
              placeholder="Account name"
            />
            <Input
              icon={FiMail}
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
          <div className="image-container">
            <img src={createAccountBanner} alt="Brands that use Monday" />
          </div>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default CreateAccount;
