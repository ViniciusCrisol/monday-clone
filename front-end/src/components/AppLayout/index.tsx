import Head from 'next/head';
import Boards from './Boards';
import SideMenu from './SideMenu';
import { Container, MainContainer } from './styles';

interface AppLayoutInterface {
  boradsMenuIsActive?: boolean;
}

const AppLayout: React.FC<AppLayoutInterface> = ({
  children,
  boradsMenuIsActive = true
}) => {
  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | App</title>
      </Head>

      <SideMenu />
      <MainContainer>
        {boradsMenuIsActive && <Boards />}
        <main>{children}</main>
      </MainContainer>
    </Container>
  );
};

export default AppLayout;
