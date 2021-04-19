import { useEffect, useState } from 'react';
import Layout from '../../components/app/AppLayout';

import {
  Feed,
  Card,
  CardList,
  Container,
  HeaderFeed
} from '../../styles/pages/app/home';
import { mondayIcon } from '../../utils/files';

const mock = [
  {
    id: '10',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '11',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '12',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '13',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '121',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '122',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '123',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '111',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '121',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '131',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '14',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    description: 'Information from Github | master |  tag |  monday-system'
  }
];

const Home: React.FC = () => {
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    setInbox(mock);
  }, []);

  return (
    <Layout>
      <Container>
        <Feed>
          <HeaderFeed>
            <h1>Inbox</h1>
            <div>Open({inbox.length})/ All Updates</div>
          </HeaderFeed>

          <CardList>
            {inbox.map(item => (
              <Card key={item.id}>
                <div className="header">
                  <div className="image-container">
                    <img src={mondayIcon} alt="Monday Icon" />
                  </div>
                </div>
              </Card>
            ))}
          </CardList>
        </Feed>
      </Container>
    </Layout>
  );
};

export default Home;
