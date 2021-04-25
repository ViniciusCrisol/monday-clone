import {
  FiUser,
  FiBell,
  FiSearch,
  FiDownload,
  FiCalendar,
  FiUserPlus
} from 'react-icons/fi';
import { mondayIcon } from '@services/files';
import { Container } from './styles';

const SideMenu: React.FC = () => {
  return (
    <Container>
      <div>
        <img src={mondayIcon} alt="Monday Icon" />
        <FiBell size={25} />
        <FiDownload size={25} />
      </div>

      <div>
        <FiCalendar size={25} />
        <FiUserPlus size={25} />
        <FiSearch size={25} />
        <FiUser size={25} />
      </div>
    </Container>
  );
};

export default SideMenu;
