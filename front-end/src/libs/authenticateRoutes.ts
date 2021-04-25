import api from '@services/api';

const redirectRoutes = {
  stay: { props: {} },
  app: { redirect: { permanent: false, destination: '/app/home' } },
  home: { redirect: { permanent: false, destination: '/' } },
  login: { redirect: { permanent: false, destination: '/auth/login' } }
};

async function validateToken(token: string): Promise<boolean> {
  api.defaults.headers.authorization = `Bearer ${token}`;
  const response = await api.get('/accounts/session');
  return response.status === 204;
}

export async function nonAuthenticatedRoutes(token: string) {
  try {
    if (!token) throw new Error();

    const tokenIsValid = await validateToken(token);
    if (!tokenIsValid) throw new Error();

    return redirectRoutes.app;
  } catch (error) {
    if (!(error instanceof Error)) return redirectRoutes.home;
    else return redirectRoutes.stay;
  }
}

export async function authenticatedRoutes(token: string) {
  try {
    if (!token) throw new Error();

    const tokenIsValid = await validateToken(token);
    if (!tokenIsValid) throw new Error();

    return redirectRoutes.stay;
  } catch (error) {
    if (!(error instanceof Error)) return redirectRoutes.login;
    else return redirectRoutes.home;
  }
}
