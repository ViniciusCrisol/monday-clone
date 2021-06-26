import { useCallback, useState } from 'react';
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
import ConfigPanel from '@components/pages/app/board/ConfigPanel';
import CreateGroup from '@components/pages/app/board/CreateGroup';
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
  user_role: number;
  project_id: string;
}

const Board: React.FC<IBoard> = ({ user_role, project_id }) => {
  const [createBoardIsActive, setCreateBoardIsActive] = useState(false);
  const { data, mutate } = fetch<IProject>(`projects/${project_id}`, {
    refreshInterval: 10000
  });

  const handleCloseCreateGroupModal = useCallback(() => {
    setCreateBoardIsActive(false);
  }, []);

  const handleOpenCreateGroupModal = useCallback(() => {
    setCreateBoardIsActive(true);
  }, []);

  const addGroup = useCallback(
    group => {
      mutate(
        {
          ...data,
          groups: [...data.groups, group]
        },
        false
      );
    },
    [data]
  );

  return (
    <>
      {createBoardIsActive && (
        <CreateGroup
          project_id={project_id}
          closeModal={handleCloseCreateGroupModal}
          addGroup={addGroup}
        />
      )}

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
            {user_role === 2 && (
              <ConfigPanel openCreateGroupModal={handleOpenCreateGroupModal} />
            )}

            {data.groups.map(group => (
              <Group key={group.id} title={group.group_name}>
                Activity Row
              </Group>
            ))}
          </MainContainer>
        )}
      </Layout>
    </>
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
