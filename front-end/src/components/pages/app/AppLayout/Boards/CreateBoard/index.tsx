import { useCallback, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import * as Yup from 'yup';

import api from '@libs/services/api';
import errorMessages from '@libs/helpers/errorMessages';
import validateErrors from '@libs/services/validateErrors';

import Input from '@components/Input';
import Modal from '@components/Modal';
import Button from '@components/Button';
import FormError from '@components/FormError';

import { Container } from './styles';
import { IProjectInterface } from '../index';

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
        <h1 className="form-title">Create board</h1>
        <label>
          <span>Project name:</span>
          <Input
            icon={FiEdit}
            name="project_name"
            placeholder="Insert the project name"
          />
        </label>
        {errorMessage && <FormError message={errorMessage} />}
        <div className="button-container">
          {!loading ? (
            <>
              <button className="simple-button" onClick={closeModal}>
                Cancel
              </button>
              <Button isSquare type="submit">
                Create Board
              </Button>
            </>
          ) : (
            <Button isSquare loading type="submit">
              Create Board
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default CreateBoard;
