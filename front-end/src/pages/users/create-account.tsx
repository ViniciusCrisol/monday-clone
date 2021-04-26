import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CookieNames } from '@hooks/useCookies';
import { nonAuthenticatedRoutes } from '@libs/authenticateRoutes';

import Modal from '@components/Modal';
import Form from '@components/pages/users/Form';
import FakeDashboard from '@components/FakeDashboard';
import { Container } from '@styles/users/create-account';

const CreateAccount: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | Create account</title>
      </Head>

      <FakeDashboard />
      <Modal>
        <Form />
      </Modal>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const tokenName: CookieNames = 'monday_user_token';

  const { [tokenName]: token } = req.cookies;
  const response = await nonAuthenticatedRoutes(token);

  return response;
};

export default CreateAccount;
