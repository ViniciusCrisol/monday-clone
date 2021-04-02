import DashboardHeader from '../DashboardHeader';
import { Container } from './styles';

const Dashboard: React.FC = ({ children }) => {
  return (
    <Container>
      <DashboardHeader />
      <div className="cards">{children}</div>
    </Container>
  );
};

export default Dashboard;
