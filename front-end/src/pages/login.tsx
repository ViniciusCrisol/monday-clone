import Head from 'next/head';
import { Container } from '../styles/pages/Home';

import CreateUser from '../components/CreateUser';
import DownloadReport from '../components/DownloadReport';
import AuthenticateUser from '../components/AuthenticateUser';

const Login: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
    </Container>
  );
};

export default Login;
