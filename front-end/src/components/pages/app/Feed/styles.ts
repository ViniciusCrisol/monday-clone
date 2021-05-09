import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 40px 40px 10px;

  @media (max-width: 480px) {
    padding: 20px 10px;
  }

  > div.feed {
    max-width: 754px;
    width: 100%;
  }
`;
