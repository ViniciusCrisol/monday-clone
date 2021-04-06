import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container isOpen={isOpen}>
      <div className="header">
        <h2>Boards</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiChevronLeft />
        </button>
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default BoardsMenu;
