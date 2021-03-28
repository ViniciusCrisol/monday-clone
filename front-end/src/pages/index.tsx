import Head from 'next/head';
import { Container } from '../styles/pages/Home';

import CreateUser from '../components/CreateUser';
import DownloadReport from '../components/DownloadReport';
import AuthenticateUser from '../components/AuthenticateUser';

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>

      <h1>API Routes</h1>
      <div className="main">
        <div>
          <span>Create user</span>
          <CreateUser />
        </div>
        <div>
          <span>Authenticate user</span>
          <AuthenticateUser />
        </div>
        <div>
          <span>Download report</span>
          <DownloadReport />
        </div>
      </div>
    </Container>
  );
};

export default Home;
