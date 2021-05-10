import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    margin-left: 8px;

    > span {
      max-width: 75px;
      width: fit-content;
      margin-left: 8px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;

    > div {
      margin-top: 8px;
      margin-left: unset;
    }
  }
`;
