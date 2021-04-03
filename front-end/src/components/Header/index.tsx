import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { mondayLogo } from '../../utils/files';
import { Container, UserContainer } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Link href="/">
        <a>
          <img src={mondayLogo} alt="monday.com(logo)" />
        </a>
      </Link>
      <UserContainer>
        <Link href="/login">
          <a>Login</a>
        </Link>

        <Link href="/create-account">
          <a className="button">
            Create Free a Account
            <FiChevronRight />
          </a>
        </Link>
      </UserContainer>{' '}
    </Container>
  );
};

export default Header;
