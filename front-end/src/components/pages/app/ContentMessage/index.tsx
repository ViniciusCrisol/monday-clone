import { useRouter } from 'next/router';
import { FiCornerDownLeft } from 'react-icons/fi';

import Button from '@components/Button';
import { Container } from './styles';

const ContentMessage: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <h1>Nothing here...</h1>
      <Button isSquare onClick={() => router.back()}>
        Go back
      </Button>
    </Container>
  );
};

export default ContentMessage;
