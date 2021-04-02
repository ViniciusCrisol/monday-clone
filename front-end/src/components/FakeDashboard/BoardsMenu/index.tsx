import {
  FiSearch,
  FiFilter,
  FiLayout,
  FiPlusCircle,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { Container } from './styles';

const BoardsMenu: React.FC = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default BoardsMenu;
