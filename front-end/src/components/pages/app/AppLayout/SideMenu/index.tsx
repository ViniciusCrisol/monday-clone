import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiUser, FiBell, FiGrid } from 'react-icons/fi';

import { mondayIcon } from '@services/files';

import { Container } from './styles';

const SideMenu: React.FC = () => {
  const router = useRouter();

  return (
    <Container>
      <div>
        <div className="image-container">
          <img src={mondayIcon} alt="123" />
        </div>
        <Link href="/app/home/">
          <a className={router.pathname === '/app/home' ? 'active' : ''}>
            <FiGrid size={23} />
            <span>Home</span>
          </a>
        </Link>
        <Link href="/app/notifications/">
          <a
            className={router.pathname === '/app/notifications' ? 'active' : ''}
          >
            <FiBell size={23} />
            <span>Notifications</span>
          </a>
        </Link>
      </div>

      <div>
        <Link href="/app/account">
          <a>
            <FiUser size={23} />
            <span>Account info</span>
          </a>
        </Link>
      </div>
    </Container>
  );
};

export default SideMenu;
