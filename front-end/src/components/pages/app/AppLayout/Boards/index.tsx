import { useState, useCallback } from 'react';
import { mutate as mutateGlobal } from 'swr';
import { FiPlusCircle, FiChevronRight } from 'react-icons/fi';

import fetch from '@libs/services/fetch';
import Loading from '@components/Loading';

import Board from './Board';
import CreateBoard from './CreateBoard';
import { Container, BoardList, Header } from './styles';

export interface IProject {
  id: string;
  project_name: string;
}

const Boards: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [createBoardIsActive, setCreateBoardIsActive] = useState(false);
  const { data, mutate } = fetch<IProject[]>('projects');

  const handleCloseCreateBoardModal = useCallback(() => {
    setCreateBoardIsActive(false);
  }, []);

  const handleOpenCreateBoardModal = useCallback(() => {
    setCreateBoardIsActive(true);
  }, []);

  const addBoard = useCallback(
    project => {
      mutate([project, ...data], false);
      mutateGlobal('projects', [project, ...data]);
    },
    [data]
  );

  return (
    <>
      {createBoardIsActive && (
        <CreateBoard
          addBoard={addBoard}
          closeModal={handleCloseCreateBoardModal}
        />
      )}

      <Container isOpen={isOpen}>
        <Header isOpen={isOpen}>
          <h2>Boards</h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiChevronRight />
          </button>
        </Header>
        <div className="create-project">
          <button onClick={handleOpenCreateBoardModal}>
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
