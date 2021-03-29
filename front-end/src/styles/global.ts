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
    background-color: ${({ theme }) => theme.colors.general.background};
  }


  body, input, button, a {
    font-size: 14px;
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased !important;
    color: ${({ theme }) => theme.colors.general.text};
  }

  a {
    border: none;
    text-decoration: none;
  }

  button, input {
    border: none
  }
`;
