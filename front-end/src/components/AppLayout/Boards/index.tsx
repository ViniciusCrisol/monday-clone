import { useEffect, useState, useCallback } from 'react';
import { FiPlusCircle, FiChevronRight } from 'react-icons/fi';

import Board from './Board';
import Loading from '../../Loading';
import CreateBoard from './CreateBoard';
import { Container, BoardList, Header } from './styles';

const Boards: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [createBoardIsActive, setCreateBoardIsActive] = useState(false);

  const createPeoject = useCallback(() => {}, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateBoard = useCallback(() => {
    setCreateBoardIsActive(prevState => !prevState);
  }, []);

  return (
    <>
      {createBoardIsActive && <CreateBoard />}

      <Container isOpen={isOpen}>
        <Header isOpen={isOpen}>
          <h2>Boards</h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiChevronRight />
          </button>
        </Header>
        <div className="create-project">
          <button onClick={handleCreateBoard}>
            <div>
              <FiPlusCircle size={18} />
              Add
            </div>
            <FiChevronRight size={18} />
          </button>
        </div>
        {isLoading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <BoardList isOpen={isOpen}>
            <Board label="Team Workflow" link="1231" />
          </BoardList>
        )}
      </Container>
    </>
  );
};

export default Boards;
