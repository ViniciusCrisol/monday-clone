import { Container, Header } from './styles';

interface IMainContainer {
  project_name: string;
  groups_indeicator: number;
  members_indeicator: number;
  activities_indeicator: number;
}

const MainContainer: React.FC<IMainContainer> = ({
  children,
  project_name,
  groups_indeicator,
  members_indeicator,
  activities_indeicator
}) => {
  return (
    <Container>
      <Header>
        <h1>{project_name}</h1>
        <div>
          <div>
            Groups/
            <span>{groups_indeicator > 99 ? '99+' : groups_indeicator}</span>
          </div>
          <div>
            Members/
            <span>{members_indeicator > 99 ? '99+' : members_indeicator}</span>
          </div>
          <div>
            Activities/
            <span>
              {activities_indeicator > 99 ? '99+' : activities_indeicator}
            </span>
          </div>
        </div>
      </Header>

      {children}
    </Container>
  );
};

export default MainContainer;
