import styled from 'styled-components';

export const Container = styled.div`
  width: 66px;
  height: 100vh;

  flex-shrink: 0;
  padding: 12px 0 16px 0;
  background: ${({ theme }) => theme.colors.others['dark-blue']};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      margin-top: 24px;
      stroke-width: 1px;
      stroke: ${({ theme }) => theme.colors.general.background};
    }

    img {
      max-width: 40px;
    }
  }
`;
