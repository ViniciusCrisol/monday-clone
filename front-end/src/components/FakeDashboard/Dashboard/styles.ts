import styled from 'styled-components';

export const Container = styled.div`
  width: calc(100vw - 255px - 66px);

  > div.cards {
    height: calc(100vh - 122px);

    padding: 30px 0;
    overflow: scroll;

    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.general.background};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.others['scrollbar-gray']};
    }
  }

  @media (max-width: 1025px) {
    width: calc(100vw - 66px);
  }
`;
