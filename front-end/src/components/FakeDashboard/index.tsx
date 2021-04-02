import Groups from './Groups';
import SideMenu from './SideMenu';
import MainContainer from './MainContainer';
import groups from './mock';
import { Container, Row } from './styles';

const FakeDashboard: React.FC = () => {
  return (
    <Container>
      <SideMenu />
      <MainContainer>
        {groups.map(group => (
          <Groups key={group.title} title={group.title}>
            {group.cards.map(card => (
              <Row key={card.name}>
                <span>{card.name}</span>
                <span>{card.email}</span>
                <span>{card.phone}</span>
                <span>{card.owner}</span>
                <span>{card.status}</span>
                <span>{card.company}</span>
                <span>{card.dueDate}</span>
                <span>{card.priority}</span>
              </Row>
            ))}
            <Row>
              <span>+ Add</span>
            </Row>
          </Groups>
        ))}
      </MainContainer>
    </Container>
  );
};

export default FakeDashboard;
