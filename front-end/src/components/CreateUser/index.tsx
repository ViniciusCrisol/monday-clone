import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Container } from './styles';
import api from '../../services/api';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      await api.post('users', { name, email, password });
      toast.success('Success!', { autoClose: 3000 });
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 3000 });
    }
  }, [name, email, password]);

  return (
    <Container>
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Create user</button>
    </Container>
  );
}

export default CreateUser;
