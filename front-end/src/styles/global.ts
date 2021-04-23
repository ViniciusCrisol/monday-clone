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

  body, input, button, a, pre {
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

  ul {
    list-style: none;
  }

  input:-webkit-autofill,
  select:-webkit-autofill,
  textarea:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) =>
      theme.colors.general.text} !important;
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) =>
      theme.colors.general.background} inset;
  }
`;
