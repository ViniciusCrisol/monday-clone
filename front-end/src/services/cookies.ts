import Cookie from 'js-cookie';
export type CookieNames = 'monday_user_token';

function getCookie(name: CookieNames) {
  const cookie = Cookie.get(name);
  return cookie;
}

function setCookie(name: string, value: string) {
  const cookie = Cookie.set(name, value);
  return cookie;
}

export { getCookie, setCookie };
