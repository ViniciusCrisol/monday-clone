import { useCallback, useRef } from 'react';
import { FiEdit } from 'react-icons/fi';

import Button from '@components/Button';
import Modal from '@components/Modal';
import Input from '@components/Input';
import { Container } from './styles';

interface ICreateBoard {
  closeModal(): void;
}

interface IFormData {
  project_name: string;
}

const CreateBoard: React.FC<ICreateBoard> = ({ closeModal }) => {
  const formRef = useRef(null);

  const handleSubmit = useCallback((data: IFormData) => {
    console.log(data);
  }, []);

  return (
    <Modal>
      <Container onSubmit={handleSubmit} ref={formRef}>
        <Input icon={FiEdit} name="project_name" placeholder="Project name" />
        <div className="button-container">
          <Button isSquare color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button isSquare type="submit">
            Create
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default CreateBoard;
