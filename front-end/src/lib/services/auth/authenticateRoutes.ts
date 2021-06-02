import api from '@libs/services/api';

const redirectRoutes = {
  stay: { props: {} },
  app: { redirect: { permanent: false, destination: '/app' } },
  home: { redirect: { permanent: false, destination: '/' } },
  login: { redirect: { permanent: false, destination: '/auth/login' } }
};

export const validateToken = async (token: string): Promise<boolean> => {
  api.defaults.headers.authorization = `Bearer ${token}`;
  const response = await api.get('/accounts/session');
  return response.status === 204;
};

export const nonAuthenticatedRoutes = async (token: string) => {
  try {
    if (!token) throw new Error();

    const tokenIsValid = await validateToken(token);
    if (!tokenIsValid) throw new Error();

    return redirectRoutes.app;
  } catch (error) {
    if (!(error instanceof Error)) return redirectRoutes.home;
    else return redirectRoutes.stay;
  }
};

export const authenticatedRoutes = async (token: string) => {
  try {
    if (!token) throw new Error();

    const tokenIsValid = await validateToken(token);
    if (!tokenIsValid) throw new Error();

    return redirectRoutes.stay;
  } catch (error) {
    if (!(error instanceof Error)) return redirectRoutes.login;
    else return redirectRoutes.home;
  }
};

export const getUserPermission = async (
  token: string,
  projectId: string | string[]
) => {
  try {
    if (!token) throw new Error();
    if (Array.isArray(projectId)) throw new Error();

    const tokenIsValid = await validateToken(token);
    if (!tokenIsValid) throw new Error();

    api.defaults.headers.authorization = `Bearer ${token}`;
    const response = await api.get(`/projects/permission/${projectId}`);

    return response.data.role;
  } catch (error) {
    if (!(error instanceof Error)) return redirectRoutes.login;
    else return redirectRoutes.app;
  }
};
