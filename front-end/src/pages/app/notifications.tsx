import fetch from '@services/fetch';
import { mondayIcon } from '@services/files';
import { defaultPattern } from '@libs/formatDate';

import Loading from '@components/Loading';
import Feed from '@components/pages/app/Feed';
import Layout from '@components/pages/app/AppLayout';
import HeaderFeed from '@components/pages/app/HeaderFeed';

import { Card, CardList, LoadingContainer } from '@styles/app/notifications';

export interface INotificationInterface {
  id: string;
  inserted_at: Date;
  project: {
    project_name: string;
  };
}

const Notifications: React.FC = () => {
  const { data, mutate } = fetch<INotificationInterface[]>('invites');

  if (!data) return <h1>loading</h1>;

  return (
    <Layout>
      <Feed>
        <HeaderFeed
          title="Notifications"
          label={`${data.length} unreaded notifications`}
        />

        {!data ? (
          <div className="loading-container">
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          </div>
        ) : (
          <CardList>
            {data.map(item => (
              <Card key={item.id}>
                <div className="header">
                  <div className="image-container">
                    <img src={mondayIcon} alt="Monday Icon" />
                  </div>
                  <div className="card-info">
                    <h3>{item.inserted_at}</h3>
                    <span>{defaultPattern(new Date(item.inserted_at))}</span>
                  </div>
                </div>
                <pre>{item.id}</pre>
              </Card>
            ))}
          </CardList>
        )}
      </Feed>
    </Layout>
  );
};

export default Notifications;
