import { mondayLogo } from '../../utils/files';
import { Container } from './styles';

import NonAuthenticatedContainer from './NonAuthenticatedContainer';

interface HeaderProps {
  isAutheticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAutheticated }) => {
  return (
    <Container>
      <img src={mondayLogo} alt="monday.com(logo)" />

      {!isAutheticated && <NonAuthenticatedContainer />}
    </Container>
  );
};

export default Header;
