import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

import { Container, Button } from './styles';

const NonAuthenticatedContainer: React.FC = () => {
  return (
    <Container>
      <Link href="/login">
        <a>Login</a>
      </Link>

      <Link href="/create-account">
        <a>
          <Button>
            Create Free Account
            <FiChevronRight />
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default NonAuthenticatedContainer;
