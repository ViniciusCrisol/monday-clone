import Head from 'next/head';
import SideMenu from './SideMenu';
import BoardsMenu from './BoardsMenu';
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
        {boradsMenuIsActive && <BoardsMenu />}
        <main>{children}</main>
      </MainContainer>
    </Container>
  );
};

export default AppLayout;
