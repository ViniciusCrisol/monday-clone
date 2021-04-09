import styled from 'styled-components';

export const Container = styled.div`
  width: 54px;
  height: 54px;

  position: relative;
  display: inline-block;

  div {
    position: absolute;
    left: 8px;

    width: 14px;
    display: inline-block;
    animation: loading-animation 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

    &:nth-child(1) {
      left: 2px;
      animation-delay: -0.24s;
      background: ${({ theme }) => theme.colors.base.red};
    }

    &:nth-child(2) {
      left: 20px;
      animation-delay: -0.12s;
      background: ${({ theme }) => theme.colors.base.yellow};
    }

    &:nth-child(3) {
      left: 38px;
      animation-delay: 0;
      background: ${({ theme }) => theme.colors.base.green};
    }
  }

  @keyframes loading-animation {
    0% {
      top: 8px;
      height: 64px;
    }

    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
`;
