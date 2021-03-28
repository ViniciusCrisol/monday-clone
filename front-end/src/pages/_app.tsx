import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from '../styles/global';
import theme from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-center"
        rtl={false}
        autoClose={false}
        draggable={false}
        newestOnTop={false}
        closeOnClick={false}
        hideProgressBar={false}
        pauseOnFocusLoss={false}
      />
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default MyApp;
