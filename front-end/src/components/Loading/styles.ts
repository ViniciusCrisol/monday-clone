import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 32px;
    height: 32px;

    margin: 8px;
    border-radius: 50%;
    border: 4px solid ${({ theme }) => theme.colors.base.blue};
    border-color: ${({ theme }) => theme.colors.base.blue} transparent
      transparent transparent;

    display: block;
    position: absolute;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
