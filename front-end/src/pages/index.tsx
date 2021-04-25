import Head from 'next/head';
import Header from '@components/Header';
import { Container } from '@styles/home';

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>monday.com: Work the way that works for you</title>
      </Head>

      <Header />
    </Container>
  );
};

export default Home;
