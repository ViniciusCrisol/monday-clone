import styled from 'styled-components';

export const Container = styled.div`
  background: url('https://res.cloudinary.com/dfhay5bfg/image/upload/v1617114531/monday-clone/create-account_gjppsc.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 100%;
    height: 100%;

    background: rgba(22, 22, 49, 0.6);

    display: flex;
    align-items: center;
    justify-content: center;

    form {
      width: 100%;
      max-width: 520px;

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
  }
`;
