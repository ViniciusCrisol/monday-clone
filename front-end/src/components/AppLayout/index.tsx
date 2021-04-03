import Head from 'next/head';
import SideMenu from './SideMenu';
import { Container, MainContainer } from './styles';

const AppLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | App</title>
      </Head>

      <SideMenu />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default AppLayout;
