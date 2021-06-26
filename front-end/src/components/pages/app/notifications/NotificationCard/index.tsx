import { FiX, FiCheck } from 'react-icons/fi';

import { mondayIcon } from '@libs/helpers/images';
import { defaultPattern } from '@libs/services/formatDate';
import { INotification } from '@pages/app/notifications';

import { Container } from './styles';

interface INotificationCard {
  data: INotification;
  handleDeclineInvite(id: string): void;
  handleAcceptInvite(id: string): void;
}

const NotificationCard: React.FC<INotificationCard> = ({
  data,
  handleDeclineInvite,
  handleAcceptInvite
}: any) => {
  return (
    <Container>
      <div className="header">
        <div className="image-container">
          <img src={mondayIcon} alt="Monday Icon" />
        </div>
        <div className="card-info">
          <h3>Project invite</h3>
          <span>{defaultPattern(data.inserted_at)}</span>
        </div>
      </div>
      <div className="card-content">
        You received an invite to join this board:
        <strong>{data.project.project_name}'s</strong>
      </div>
      <div className="footer">
        <button onClick={() => handleDeclineInvite(data.id)}>
          <FiX />
          Decline
        </button>
        <button onClick={() => handleAcceptInvite(data.id)}>
          <FiCheck />
          Accept
        </button>
      </div>
    </Container>
  );
};

export default NotificationCard;
