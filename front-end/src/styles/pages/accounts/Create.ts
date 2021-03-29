import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.base.yellow};
  height: calc(100vh - 72px);

  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 420px;

    padding: 30px;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.general.background};

    display: flex;
    flex-direction: column;

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
    }

    button {
      width: 100%;
      margin: 16px 0;
    }

    a {
      text-align: center;
      text-decoration: underline;
    }
  }
`;
