import { FiStar } from 'react-icons/fi';
import { Container } from './styles';

const DashboardHeader: React.FC = () => {
  return (
    <Container>
      <h1>
        Team Workflow <FiStar size={22} />
      </h1>

      <div>
        <span>Integrate/0</span>
        <span>Automate/10</span>
        <button>Subscribers/4</button>
        <button>
          Activities/<span>99+</span>
        </button>
      </div>
    </Container>
  );
};

export default DashboardHeader;
