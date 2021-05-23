import { useState, useCallback } from 'react';
import { mutate as mutateGlobal } from 'swr';
import { FiPlusCircle, FiChevronRight } from 'react-icons/fi';

import fetch from '@services/fetch';

import Board from './Board';
import Loading from '@components/Loading';

import CreateBoard from './CreateBoard';
import { Container, BoardList, Header } from './styles';

export interface IProjectInterface {
  id: string;
  project_name: string;
}

const Boards: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [createBoardIsActive, setCreateBoardIsActive] = useState(false);
  const { data, mutate } = fetch<IProjectInterface[]>('projects');

  const handleCloseModal = useCallback(() => {
    setCreateBoardIsActive(false);
  }, []);

  const handleCreateBoard = useCallback(() => {
    setCreateBoardIsActive(prevState => !prevState);
  }, []);

  const addBoard = useCallback(project => {
    const updatedProjects = [project, ...data];

    mutate(updatedProjects, false);
    mutateGlobal('projects', updatedProjects);
  }, []);

  return (
    <>
      {createBoardIsActive && (
        <CreateBoard closeModal={handleCloseModal} addBoard={addBoard} />
      )}

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
        {!data ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <BoardList isOpen={isOpen}>
            {data.map(({ id, project_name }) => (
              <Board key={id} id={id} label={project_name} />
            ))}
          </BoardList>
        )}
      </Container>
    </>
  );
};

export default Boards;
