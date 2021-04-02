import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  border-radius: 12px 0px 0px 0px;
  background: ${({ theme }) => theme.colors.general.background};
`;
