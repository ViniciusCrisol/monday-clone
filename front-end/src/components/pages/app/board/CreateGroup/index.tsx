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

interface ICreateGroup {
  project_id: string;
  closeModal(): void;
  addGroup(group: ITempGroupData): void;
}

interface ITempGroupData {
  id: string;
  group_name: string;
}

interface IFormData {
  group_name: string;
}

const CreateGroup: React.FC<ICreateGroup> = ({
  project_id,
  closeModal,
  addGroup
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = useCallback(async ({ group_name }: IFormData) => {
    setLoading(true);

    try {
      const schema = Yup.object().shape({
        group_name: Yup.string().required(errorMessages.groupNameRequired)
      });
      await schema.validate({ group_name }, { abortEarly: false });

      const response = await api.post(`/projects/groups/${project_id}`, {
        group_name
      });
      const { id } = response.data;

      addGroup({ id, group_name });
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
        <h1 className="form-title">Create group</h1>
        <Input
          icon={FiEdit}
          name="group_name"
          placeholder="Insert the group name"
        />
        {errorMessage && <FormError message={errorMessage} />}
        <div className="button-container">
          {!loading ? (
            <>
              <button className="simple-button" onClick={closeModal}>
                Cancel
              </button>
              <Button isSquare type="submit">
                Create Group
              </Button>
            </>
          ) : (
            <Button isSquare loading type="submit">
              Create Group
            </Button>
          )}
        </div>
      </Container>
    </Modal>
  );
};

export default CreateGroup;
