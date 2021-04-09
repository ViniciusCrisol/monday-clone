import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.nav`
  width: 66px;
  height: 100vh;

  flex-shrink: 0;
  padding: 12px 10px 16px;
  background: ${({ theme }) => theme.colors.others['dark-blue']};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    div.image-container {
      padding: 0 13px;
      margin-bottom: 8px;
    }

    img {
      max-width: 40px;
    }

    a {
      position: relative;
      width: 44px;
      height: 44px;

      border-radius: 4px;
      transition: background 200ms;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        stroke-width: 1.3px;
        stroke: ${({ theme }) => theme.colors.general.background};
      }

      span {
        opacity: 0;
        font-size: 0;
        transition: opacity 150ms, transform 200ms;
      }

      &:hover {
        background: ${({ theme }) =>
          darken(0.125, theme.colors.others['side-menu-active'])};

        span {
          width: max-content;
          position: absolute;
          z-index: 50;
          left: 28px;

          opacity: 100;
          padding: 6px 12px;
          border-radius: 4px;
          transform: translateX(36px);
          background: ${({ theme }) => theme.colors.others['dark-blue']};

          font-size: 16px;
          color: ${({ theme }) => theme.colors.general.background};

          &::after {
            content: '';

            position: absolute;
            left: -3px;
            top: 10px;

            width: 10px;
            height: 10px;

            border-radius: 2px;
            transform: rotate(45deg);
            background: ${({ theme }) => theme.colors.others['dark-blue']};
          }
        }
      }

      &.active {
        background: ${({ theme }) => theme.colors.others['side-menu-active']};
      }

      & + a {
        margin-top: 8px;
      }
    }
  }
`;
