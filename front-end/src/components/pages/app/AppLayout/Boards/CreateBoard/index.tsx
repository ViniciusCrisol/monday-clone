import { useCallback, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import * as Yup from 'yup';

import api from '@services/api';
import { IProjectInterface } from '../index';

import Input from '@components/Input';
import Modal from '@components/Modal';
import Button from '@components/Button';
import FormError from '@components/FormError';

import { Container } from './styles';
import errorMessages from '@libs/errorMessages';
import validateErrors from '@libs/validateErrors';

interface ICreateBoard {
  closeModal(): void;
  addBoard(project: IProjectInterface): void;
}

interface IFormData {
  project_name: string;
}

const CreateBoard: React.FC<ICreateBoard> = ({ closeModal, addBoard }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = useCallback(async ({ project_name }: IFormData) => {
    setLoading(true);

    try {
      const schema = Yup.object().shape({
        project_name: Yup.string().required(errorMessages.projectNameRequired)
      });
      await schema.validate({ project_name }, { abortEarly: false });

      const response = await api.post('/projects', { project_name });
      const { id } = response.data;

      addBoard({ id, project_name });
      setLoading(false);
      closeModal();
    } catch (error) {
      const errorMessage = validateErrors(error);
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  }, []);

  return (
    <Modal>
      <Container onSubmit={handleSubmit} ref={formRef}>
        <FormError message={errorMessage} />
        <Input icon={FiEdit} name="project_name" placeholder="Project name" />
        <div className="button-container">
          {!loading ? (
            <>
              <Button isSquare color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button isSquare type="submit">
                Create
              </Button>
            </>
          ) : (
            <Button isSquare loading type="submit">
              Create
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default CreateBoard;
