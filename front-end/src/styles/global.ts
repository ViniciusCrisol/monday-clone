import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    background-color: ${({ theme }) => theme.colors.background};
  }


  body, input, button, a {
    font-size: 14px;
    font-family: Roboto, sans-serif;
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased !important;
  }

  a {
    border: none;
    text-decoration: none;
  }

  button {
    border: none
  }
`;
