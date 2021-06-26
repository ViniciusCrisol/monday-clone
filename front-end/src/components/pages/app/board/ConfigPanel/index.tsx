import { Container } from './styles';
import Button from '@components/Button';

interface IConfigPanel {
  openCreateGroupModal(): void;
}

const ConfigPanel: React.FC<IConfigPanel> = ({ openCreateGroupModal }) => {
  return (
    <Container>
      <Button isSquare onClick={openCreateGroupModal}>
        Create group
      </Button>
    </Container>
  );
};

export default ConfigPanel;
