import { useCallback } from 'react';
import { FiRefreshCw, FiX, FiCheck } from 'react-icons/fi';

import api from '@services/api';
import fetch from '@services/fetch';
import { mondayIcon } from '@services/files';
import { defaultPattern } from '@libs/formatDate';

import Loading from '@components/Loading';
import Feed from '@components/pages/app/Feed';
import Layout from '@components/pages/app/AppLayout';
import HeaderFeed from '@components/pages/app/HeaderFeed';

import {
  Card,
  CardList,
  RefreshButton,
  LoadingContainer
} from '@styles/app/notifications';

export interface INotificationInterface {
  id: string;
  inserted_at: Date;
  project: {
    project_name: string;
  };
}

const Notifications: React.FC = () => {
  const { data, mutate } = fetch<INotificationInterface[]>('invites', {
    refreshInterval: 5000
  });

  const handleDeclineInvite = useCallback(async (inviteId: string) => {
    api.post(`/invites/decline/${inviteId}`);

    const updatedInvites = data.filter(data => data.id !== inviteId);
    mutate(updatedInvites, true);
  }, []);

  const handleAcceptInvite = useCallback(async (inviteId: string) => {
    // await api.post(`/invites/accept/${inviteId}`);
    // const updatedInvites = data.filter(data => data.id !== inviteId);
    // mutate(updatedInvites, true);
  }, []);

  return (
    <Layout>
      <Feed>
        {data && (
          <HeaderFeed
            title="Notifications"
            label={`${data.length} unreaded notifications`}
          >
            <RefreshButton>
              <FiRefreshCw />
            </RefreshButton>
          </HeaderFeed>
        )}

        {!data ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <CardList>
            {data.map(item => (
              <Card key={item.id}>
                <div className="header">
                  <div className="image-container">
                    <img src={mondayIcon} alt="Monday Icon" />
                  </div>
                  <div className="card-info">
                    <h3>Project invite</h3>
                    <span>{defaultPattern(item.inserted_at)}</span>
                  </div>
                </div>
                <div className="card-content">
                  You received an invite to join this board:
                  <strong>{item.project.project_name}'s</strong>
                </div>
                <div className="footer">
                  <button onClick={() => handleDeclineInvite(item.id)}>
                    <FiX />
                    Decline
                  </button>
                  <button onClick={() => handleAcceptInvite(item.id)}>
                    <FiCheck />
                    Accept
                  </button>
                </div>
              </Card>
            ))}
          </CardList>
        )}
      </Feed>
    </Layout>
  );
};

export default Notifications;
