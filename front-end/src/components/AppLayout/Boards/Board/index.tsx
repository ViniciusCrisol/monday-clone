import { FiLayout } from 'react-icons/fi';
import router from 'next/router';
import Link from 'next/link';

import { Container } from './styles';

interface BoardInterface {
  link: string;
  label: string;
}

const Board: React.FC<BoardInterface> = ({ label, link }) => {
  return (
    <Container>
      <Link href={`/app/boards/${link}`}>
        <a
          className={router.pathname === `/app/boards/${link}` ? 'active' : ''}
        >
          <FiLayout size={18} />
          <span className="text">{label}</span>
        </a>
      </Link>
    </Container>
  );
};

export default Board;
