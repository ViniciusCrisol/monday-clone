import Dashboard from '../Dashboard';
import BoardsMenu from '../BoardsMenu';
import { Container } from './styles';

const MainContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <BoardsMenu />
      <Dashboard>{children}</Dashboard>
    </Container>
  );
};

export default MainContainer;
