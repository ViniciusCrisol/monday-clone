import { Container } from './styles';

interface IHeaderFeed {
  title: string;
  label: string;
}

const HeaderFeed: React.FC<IHeaderFeed> = ({ title, label }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <div>{label}</div>
    </Container>
  );
};

export default HeaderFeed;
