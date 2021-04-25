import { CookieProvider } from './useCookies';

const AppProvider: React.FC = ({ children }) => (
  <CookieProvider>{children}</CookieProvider>
);

export default AppProvider;
