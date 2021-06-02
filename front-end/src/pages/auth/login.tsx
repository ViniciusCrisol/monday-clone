import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { mondayLogo } from '@libs/helpers/images';
import { CookieNames } from '@libs/services/auth/cookies';
import { nonAuthenticatedRoutes } from '@libs/services/auth/authenticateRoutes';

import Form from '@components/pages/auth/Form';
import { Header, Container } from '@styles/auth/login';

const Login: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | Login</title>
      </Head>

      <Header>
        <img src={mondayLogo} alt="monday.com(logo)" />
      </Header>
      <Form />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const tokenName: CookieNames = 'monday_user_token';

  const { [tokenName]: token } = req.cookies;
  const response = await nonAuthenticatedRoutes(token);

  return response;
};

export default Login;
