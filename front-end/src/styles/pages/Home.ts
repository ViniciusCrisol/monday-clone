import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin-bottom: 20px;
    font-size: 40px;
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    height: 50px;
    width: 200px;

    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.main {
    margin-top: 30px;

    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 1fr);

    > div span {
      font-size: 12px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.primary};

      display: block;
      margin-bottom: 5px;
    }
  }
`;
