import { useEffect, useCallback, useContext, createContext } from 'react';
import Cookie from 'js-cookie';
import api from '@services/api';

export type CookieNames = 'monday_user_token';

interface ICookieContextData {
  getCookie(name: CookieNames): string | undefined;
  setCookie(name: CookieNames, value: string): void;
}

const CookieContext = createContext<ICookieContextData>(
  {} as ICookieContextData
);

export const CookieProvider: React.FC = ({ children }) => {
  useEffect(() => {
    const token = Cookie.get('monday_user_token');
    api.defaults.headers.authorization = `Bearer ${token}`;
  });

  const getCookie = useCallback((name: string) => {
    const cookie = Cookie.get(name);
    return cookie;
  }, []);

  const setCookie = useCallback((name: string, value) => {
    const cookie = Cookie.set(name, value);
    return cookie;
  }, []);

  return (
    <CookieContext.Provider value={{ getCookie, setCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export function useCookie(): ICookieContextData {
  const context = useContext(CookieContext);
  if (!context) return;
  return context;
}
