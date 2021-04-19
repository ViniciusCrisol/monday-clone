import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiEdit } from 'react-icons/fi';

import Button from '../../../../Button';
import Modal from '../../../../Modal';
import Input from '../../../../Input';
import { Container } from './styles';

interface formData {
  project_name: string;
}

interface CreateBoardProps {
  closeModal(): void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ closeModal }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: formData) => {
    console.log(data);
  }, []);

  return (
    <Modal>
      <Container onSubmit={handleSubmit} ref={formRef}>
        <Input
          icon={FiEdit}
          type="text"
          name="project_name"
          placeholder="Project name"
        />
        <div className="button-container">
          <Button isSquare color="red" onClick={closeModal}>
            Cancel
          </Button>
          <Button isSquare type="submit">
            Register
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default CreateBoard;
