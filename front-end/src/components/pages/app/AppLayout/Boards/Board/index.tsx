import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiLayout } from 'react-icons/fi';

import { Container } from './styles';

export interface IBoardInterface {
  id: string;
  label: string;
}

const Board: React.FC<IBoardInterface> = ({ label, id }) => {
  const router = useRouter();

  return (
    <Container>
      <Link href={`/app/boards/${id}`}>
        <a className={router.pathname === `/app/boards/${id}` ? 'active' : ''}>
          <FiLayout size={18} />
          <span className="text">{label}</span>
        </a>
      </Link>
    </Container>
  );
};

export default Board;
