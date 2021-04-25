import Head from 'next/head';

import Boards from './Boards';
import SideMenu from './SideMenu';
import { Container, MainContainer } from './styles';

interface ILayout {
  boardsMenuIsActive?: boolean;
}

const AppLayout: React.FC<ILayout> = ({
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
