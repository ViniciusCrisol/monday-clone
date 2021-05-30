import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import { defaultPattern } from '@libs/formatDate';
import { mondayIcon } from '@services/files';
import { CookieNames } from '@services/cookies';
import { authenticatedRoutes } from '@libs/authenticateRoutes';

import Feed from '@components/pages/app/Feed';
import Layout from '@components/pages/app/AppLayout';
import HeaderFeed from '@components/pages/app/HeaderFeed';

import { Card, CardList } from '@styles/app/home';

const mock = [
  {
    id: '10',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '11',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '12',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '13',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '121',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '122',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '123',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '111',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '141',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '131',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
    description: 'Information from Github | master |  tag |  monday-system'
  },
  {
    id: '14',
    title: 'Create Menu',
    status: 'Paused',
    project_name: 'Clone Monday',
    created_at: new Date('2021-04-23 22:27:20.548523'),
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
      <Feed>
        <HeaderFeed title="Inbox" />

        <CardList>
          {inbox.map(item => (
            <Card key={item.id}>
              <div className="header">
                <div className="image-container">
                  <img src={mondayIcon} alt="Monday Icon" />
                </div>
                <div className="card-info">
                  <h3>{item.project_name}</h3>
                  <span>{defaultPattern(item.created_at)}</span>
                </div>
              </div>
              <pre>{item.description}</pre>
            </Card>
          ))}
        </CardList>
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

export default Home;
