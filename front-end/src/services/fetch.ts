import useSWR from 'swr';

import api from '@services/api';
import { getCookie } from '@services/cookies';

function fetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
    const token = getCookie('monday_user_token');

    api.defaults.headers.authorization = `Bearer ${token}`;
    const response = await api.get(url);
    return response.data;
  });

  return { data, error, mutate };
}

export default fetch;
