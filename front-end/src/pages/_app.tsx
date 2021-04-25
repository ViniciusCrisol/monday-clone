import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from '@styles/../global';
import AppProvider from '@hooks/index';
import theme from '@styles/../theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ToastContainer
          position="top-center"
          autoClose={false}
          draggable={false}
          closeOnClick={false}
          pauseOnFocusLoss={false}
        />

        <Component {...pageProps} />
      </ThemeProvider>
    </AppProvider>
  );
};

export default MyApp;
