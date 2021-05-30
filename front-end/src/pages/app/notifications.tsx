import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { mutate as mutateGlobal } from 'swr';
import { FiRefreshCw } from 'react-icons/fi';

import api from '@services/api';
import fetch from '@services/fetch';
import errorMessages from '@libs/errorMessages';
import { CookieNames } from '@services/cookies';
import { authenticatedRoutes } from '@libs/authenticateRoutes';

import Loading from '@components/Loading';
import Feed from '@components/pages/app/Feed';
import Layout from '@components/pages/app/AppLayout';
import HeaderFeed from '@components/pages/app/HeaderFeed';
import ContentMessage from '@components/pages/app/ContentMessage';
import NotificationCard from '@components/pages/app/notifications/NotificationCard';

import {
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
    refreshInterval: 15000
  });

  const handleDeclineInvite = useCallback(
    async (inviteId: string) => {
      try {
        await api.patch(`/invites/decline/${inviteId}`);
        const updatedInvites = data.filter(data => data.id !== inviteId);

        mutate(updatedInvites, true);
      } catch (error) {
        toast.error(
          error.response.data.message || errorMessages.defaultMessage,
          { autoClose: 5000 }
        );
      }
    },
    [data]
  );

  const handleAcceptInvite = useCallback(
    async (inviteId: string) => {
      try {
        await api.patch(`/invites/accept/${inviteId}`);
        const updatedProjects = await api.get('/projects');
        const updatedInvites = data.filter(data => data.id !== inviteId);

        mutate(updatedInvites, true);
        mutateGlobal('projects', updatedProjects.data);
      } catch (error) {
        toast.error(
          error.response.data.message || errorMessages.defaultMessage,
          { autoClose: 5000 }
        );
      }
    },
    [data]
  );

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
          <>
            {data.length === 0 && <ContentMessage />}

            {data.length > 0 && (
              <CardList>
                {data.map(item => (
                  <NotificationCard
                    key={item.id}
                    data={item}
                    handleDeclineInvite={handleDeclineInvite}
                    handleAcceptInvite={handleAcceptInvite}
                  />
                ))}
              </CardList>
            )}
          </>
        )}
      </Feed>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const tokenName: CookieNames = 'monday_user_token';

  const { [tokenName]: token } = req.cookies;
  const response = await authenticatedRoutes(token);

  return response;
};

export default Notifications;
