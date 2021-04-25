import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiPaperclip, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { createAccountBanner } from '@services/files';

import Input from '@components/Input';
import Modal from '@components/Modal';
import Button from '@components/Button';
import FakeDashboard from '@components/FakeDashboard';

import { Container, FormContainer } from '@styles/users/create-account';

interface IFormData {
  user_name: string;
  user_email: string;
  account_name: string;
  password: string;
  confirm_password: string;
}

const CreateAccount: React.FC = () => {
  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = useCallback((data: IFormData) => {
    console.log(data);

    router.push('/auth/login');
  }, []);

  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | Create account</title>
      </Head>

      <FakeDashboard />
      <Modal>
        <FormContainer onSubmit={handleSubmit} ref={formRef}>
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
        </FormContainer>
      </Modal>
    </Container>
  );
};

export default CreateAccount;
