import Head from 'next/head';
import Boards from './Boards';
import SideMenu from './SideMenu';
import { Container, MainContainer } from './styles';

interface LayoutProps {
  boardsMenuIsActive?: boolean;
}

const AppLayout: React.FC<LayoutProps> = ({
  children,
  boardsMenuIsActive = true
}) => {
  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | App</title>
      </Head>

      <SideMenu />
      <MainContainer>
        {boardsMenuIsActive && <Boards />}
        <main>{children}</main>
      </MainContainer>
    </Container>
  );
};

export default AppLayout;
