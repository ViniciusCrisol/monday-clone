import Link from 'next/link';
import { Container } from './styles';
import { mondayLogo } from '../../utils/files';

import NonAuthenticatedContainer from './NonAuthenticatedContainer';

interface HeaderProps {
  isAutheticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAutheticated }) => {
  return (
    <Container>
      <Link href={!isAutheticated && '/'}>
        <a>
          <img src={mondayLogo} alt="monday.com(logo)" />
        </a>
      </Link>

      {!isAutheticated && <NonAuthenticatedContainer />}
    </Container>
  );
};

export default Header;
