import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  z-index: 50;
  left: 0;
  top: 0;

  padding: 10px;
  background: ${({ theme }) => theme.colors.others['modal-background']};

  display: flex;
  align-items: center;
  justify-content: center;
`;
