import useSWR from 'swr';

import api from './api';
import { getCookie } from './auth/cookies';

interface IFatchProps {
  refreshInterval?: number;
}

const fetch = <Data = any, Error = any>(url: string, props?: IFatchProps) => {
  const { data, error, mutate } = useSWR<Data, Error>(
    url,
    async url => {
      const token = getCookie('monday_user_token');

      api.defaults.headers.authorization = `Bearer ${token}`;
      const response = await api.get(url);
      return response.data;
    },
    props
  );

  return { data, error, mutate };
};

export default fetch;
