import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.others['dark-blue']};
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;

  border-radius: 12px 0px 0px 0px;
  background: ${({ theme }) => theme.colors.general.background};

  display: flex;

  overflow-y: scroll;
  overflow-x: hidden;

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
`;
