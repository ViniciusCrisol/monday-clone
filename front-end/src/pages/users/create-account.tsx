import Head from 'next/head';

import Modal from '@components/Modal';
import Form from '@components/pages/users/Form';
import FakeDashboard from '@components/FakeDashboard';

import { Container } from '@styles/users/create-account';

const CreateAccount: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>monday.com: Where Teams Get Work Done | Create account</title>
      </Head>

      <FakeDashboard />
      <Modal>
        <Form />
      </Modal>
    </Container>
  );
};

export default CreateAccount;
