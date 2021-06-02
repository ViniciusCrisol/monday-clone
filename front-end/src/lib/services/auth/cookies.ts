import Cookie from 'js-cookie';
export type CookieNames = 'monday_user_token';

export const getCookie = (name: CookieNames) => {
  const cookie = Cookie.get(name);
  return cookie;
};

export const setCookie = (name: string, value: string) => {
  const cookie = Cookie.set(name, value);
  return cookie;
};
