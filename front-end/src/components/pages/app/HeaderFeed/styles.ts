import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;

    > div {
      margin-top: 8px;
      margin-left: unset;
    }
  }
`;
