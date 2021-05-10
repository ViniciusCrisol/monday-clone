import { Container } from './styles';

interface IHeaderFeed {
  title: string;
  label?: string;
}

const HeaderFeed: React.FC<IHeaderFeed> = ({ title, label, children }) => {
  return (
    <Container>
      <h1>{title}</h1>
      <div>
        {children}
        <span>{label}</span>
      </div>
    </Container>
  );
};

export default HeaderFeed;
