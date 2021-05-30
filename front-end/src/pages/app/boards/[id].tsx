import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import {
  getUserPermission,
  authenticatedRoutes
} from '@libs/authenticateRoutes';
import { CookieNames } from '@services/cookies';

import Layout from '@components/pages/app/AppLayout';

interface IBoard {
  user_role: string;
}

const Board: React.FC<IBoard> = ({ user_role }) => {
  const router = useRouter();

  return (
    <Layout>
      <p>role: {user_role}</p>
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
      user_role: permission
    }
  };
};

export default Board;
