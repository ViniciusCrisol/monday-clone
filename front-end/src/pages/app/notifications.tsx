import { mondayIcon } from '@services/files';
import { defaultPattern } from '@libs/formatDate';

import Layout from '@components/pages/app/AppLayout';
import {
  Feed,
  Card,
  CardList,
  Container,
  HeaderFeed
} from '@styles/app/notifications';
import fetch from '@services/fetch';

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
      <Container>
        <Feed>
          <HeaderFeed>
            <h1>Notifications</h1>
            <div>Open({data.length})/All Updates</div>
          </HeaderFeed>

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
        </Feed>
      </Container>
    </Layout>
  );
};

export default Notifications;
