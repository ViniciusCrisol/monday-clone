import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  width: 100%;
  height: 65px;

  padding: 12px;
  background: ${({ theme }) => theme.colors.others['card-background']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 44px;
  }
`;
