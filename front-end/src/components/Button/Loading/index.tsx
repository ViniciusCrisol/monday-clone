import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </Container>
  );
};

export default Loading;
