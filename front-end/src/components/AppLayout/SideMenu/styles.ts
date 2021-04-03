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

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 4px;
      transition: background 200ms;

      svg {
        stroke-width: 1.3px;
        stroke: ${({ theme }) => theme.colors.general.background};
      }

      span {
        font-size: 0;
      }

      &:hover {
        background: ${({ theme }) =>
          darken(0.125, theme.colors.others['side-menu-active'])};

        span {
          z-index: 50;
          position: absolute;
          left: 62px;

          width: max-content;

          font-size: 16px;
          color: ${({ theme }) => theme.colors.general.background};

          padding: 6px 12px;
          border-radius: 4px;
          background: ${({ theme }) => theme.colors.others['dark-blue']};

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
