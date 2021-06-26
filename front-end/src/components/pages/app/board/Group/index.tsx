import { FiChevronDown } from 'react-icons/fi';
import { Container } from './styles';

interface IGroup {
  title: string;
}

const Groups: React.FC<IGroup> = ({ title, children }) => {
  return (
    <Container>
      <div className="header-group">
        <span>
          <h2>
            <span>
              <FiChevronDown size={14} />
            </span>
            {title}
          </h2>
        </span>

        <span>Email</span>
        <span>Owner</span>
        <span>Status</span>
        <span>Due date</span>
        <span>Spent time</span>
        <span>Created at</span>
        <span>Updated at</span>
      </div>

      {children}
    </Container>
  );
};

export default Groups;
