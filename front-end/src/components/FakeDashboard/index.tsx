import {
  FiSearch,
  FiFilter,
  FiPlusCircle,
  FiChevronRight,
  FiChevronLeft,
  FiLayout,
  FiStar
} from 'react-icons/fi';

import { mondayIcon } from '../../utils/files';
import { Container, Dashboard } from './styles';

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
          <ul>
            <li>
              <FiLayout size={18} />
              Team Workflow
            </li>
            <li>
              <FiLayout size={18} />
              Weekly Updates
            </li>
            <li>
              <FiLayout size={18} />
              Dashboard
            </li>
          </ul>
        </div>

        <Dashboard>
          <div className="header">
            <h1>
              Team Workflow <FiStar size={22} />
            </h1>

            <div>
              <span>Integrate/0</span>
              <span>Automate/10</span>
              <button>Subscribers/4</button>
              <button>
                Activities/<span>99+</span>
              </button>
            </div>
          </div>
        </Dashboard>
      </div>
    </Container>
  );
};

export default FakeDashboard;
