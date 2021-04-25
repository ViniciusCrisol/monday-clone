import api from '@services/api';

export async function nonAuthenticatedRoutes(token: string) {
  try {
    api.defaults.headers.authorization = `Bearer ${token}`;
    await api.get('/accounts/session');

    return {
      redirect: {
        permanent: false,
        destination: '/app/home'
      }
    };
  } catch (error) {
    console.log(error.response.data);

    if (error.response.status !== 401) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    }
  }

  return { props: {} };
}
