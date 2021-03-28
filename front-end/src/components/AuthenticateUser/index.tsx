import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Container } from './styles';
import api from '../../services/api';

function AuthenticateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      const response = await api.post('sessions', { email, password });

      toast.success('Success!', { autoClose: 3000 });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 3000 });
    }
  }, [email, password]);

  return (
    <Container>
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
      <button onClick={handleSubmit}>Authenticate</button>
    </Container>
  );
}

export default AuthenticateUser;
