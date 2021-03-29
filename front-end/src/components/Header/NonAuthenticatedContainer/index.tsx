import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

import { Container } from './styles';

const NonAuthenticatedContainer: React.FC = () => {
  return (
    <Container>
      <Link href="/account/login">
        <a>Login</a>
      </Link>

      <Link href="/account/create">
        <a className="button">
          Create Free Account
          <FiChevronRight />
        </a>
      </Link>
    </Container>
  );
};

export default NonAuthenticatedContainer;
