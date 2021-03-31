import {
  FiSearch,
  FiFilter,
  FiPlusCircle,
  FiChevronRight,
  FiChevronLeft
} from 'react-icons/fi';

import { mondayIcon } from '../../utils/files';

import { Container } from './styles';

const FakeDashboard: React.FC = () => {
  return (
    <Container>
      <div className="side-menu">
        <div>
          <img src={mondayIcon} alt="Monday Icon" />
        </div>
      </div>
      <div className="main-container">
        <div className="boards-menu">
          <div className="header">
            <h2>Boards</h2>
            <span>
              <FiChevronLeft />
            </span>
          </div>
          <ul>
            <li>
              <div>
                <FiPlusCircle size={18} />
                Add
              </div>
              <FiChevronRight size={18} />
            </li>
            <li>
              <div>
                <FiFilter size={18} />
                Filter
              </div>
              <FiChevronRight size={18} />
            </li>
            <li>
              <div>
                <FiSearch size={18} />
                Search..
              </div>
              <FiChevronRight size={18} />
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default FakeDashboard;
