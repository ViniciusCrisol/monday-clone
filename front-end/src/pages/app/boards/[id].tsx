import { GetServerSideProps } from 'next';

import {
  getUserPermission,
  authenticatedRoutes
} from '@libs/services/auth/authenticateRoutes';
import api from '@libs/services/api';
import fetch from '@libs/services/fetch';
import { CookieNames } from '@libs/services/auth/cookies';

import Loading from '@components/Loading';
import Layout from '@components/pages/app/AppLayout';
import Group from '@components/pages/app/board/Group';
import MainContainer from '@components/pages/app/board/MainContainer';

import { LoadingContainer } from '@styles/app/notifications';

interface IGroup {
  group_name: string;
  project_id: string;
  leader_id: string;
  id: string;
  inserted_at: string;
  updated_at: string;
}

interface IProject {
  id: string;
  project_name: string;
  account_id: string;
  inserted_at: string;
  updated_at: string;
  members: [];
  groups: IGroup[];
}

interface IBoard {
  user_role: string;
  project_id: string;
}

const Board: React.FC<IBoard> = ({ user_role, project_id }) => {
  const { data, mutate } = fetch<IProject>(`projects/${project_id}`, {
    refreshInterval: 15000
  });

  console.log(data);

  return (
    <Layout>
      {!data ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <MainContainer
          project_name={data.project_name}
          groups_indeicator={data.groups.length}
          members_indeicator={data.members.length}
          activities_indeicator={999}
        >
          {data.groups.map(group => (
            <Group key={group.id} title={group.group_name}>
              {/* {group.activities.map(activity => (
              <Row key={activity.name}>
                <span>{activity.name}</span>
                <span>{activity.email}</span>
                <span>{activity.phone}</span>
                <span>{activity.owner}</span>
                <span>{activity.status}</span>
                <span>{activity.company}</span>
                <span>{activity.dueDate}</span>
                <span>{activity.priority}</span>
              </Row>
            ))} */}
              {/* <Row>
                <span>+ Add</span>
              </Row> */}
            </Group>
          ))}
        </MainContainer>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const tokenName: CookieNames = 'monday_user_token';

  const { [tokenName]: token } = req.cookies;
  const authenticated = await authenticatedRoutes(token);
  if (authenticated['redirect']) return authenticated;

  const permission = await getUserPermission(token, params.id);
  if (permission['redirect']) return permission;

  return {
    props: {
      user_role: permission,
      project_id: params.id
    }
  };
};

export default Board;
