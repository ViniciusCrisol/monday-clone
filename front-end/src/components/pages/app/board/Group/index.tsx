import { FiChevronDown } from 'react-icons/fi';
import { Container } from './styles';

interface IGroup {
  title: string;
}

const Groups: React.FC<IGroup> = ({ title, children }) => {
  return (
    <Container>
      <div className="header">
        <span>
          <h2>
            <span>
              <FiChevronDown size={14} />
            </span>
            {title}
          </h2>
        </span>

        <span>Email</span>
        <span>Phone</span>
        <span>Owner</span>
        <span>Status</span>
        <span>Company</span>
        <span>Due date</span>
        <span>Priority</span>
      </div>
      {children}
    </Container>
  );
};

export default Groups;
