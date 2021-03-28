import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

import Header from '../components/Header';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer
        position="top-center"
        autoClose={false}
        draggable={false}
        closeOnClick={false}
        pauseOnFocusLoss={false}
      />

      <Header isAutheticated={false} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
