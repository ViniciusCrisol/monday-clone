import { Container } from './styles';

const Feed: React.FC = ({ children }) => {
  return (
    <Container>
      <div className="feed">{children}</div>
    </Container>
  );
};

export default Feed;
