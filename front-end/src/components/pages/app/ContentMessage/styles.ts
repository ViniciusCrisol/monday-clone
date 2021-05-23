import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  margin: 64px 0;
  padding: 4px 0 4px 12px;
  border-left: 4px solid ${({ theme }) => theme.colors.base.yellow};

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 22px;
  }
`;
