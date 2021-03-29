import Head from 'next/head';
import { Container } from '../styles/pages/Home';

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>monday.com: Work the way that works for you</title>
      </Head>
    </Container>
  );
};

export default Home;
