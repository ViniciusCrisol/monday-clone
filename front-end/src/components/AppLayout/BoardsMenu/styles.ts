import styled, { css } from 'styled-components';

interface BoardsMenuInterface {
  isOpen?: boolean;
}

export const Container = styled.div<BoardsMenuInterface>`
  width: ${({ isOpen }) => (isOpen ? '255px' : '30px')};
  height: 100vh;

  position: sticky;
  top: 0;

  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  transition: width 150ms;

  div.header {
    width: 100%;
    height: 64px;
    position: relative;

    display: flex;
    align-items: center;
    padding: ${({ isOpen }) => (isOpen ? '0 24px' : '0')};

    h2 {
      font-size: 20px;
      transition: width 150ms;
      display: ${({ isOpen }) => (isOpen ? 'unset' : 'none')};
    }

    button {
      position: absolute;
      right: -13.5px;

      width: 26px;
      height: 26px;

      border-radius: 13px;
      background: ${({ theme }) => theme.colors.general.background};
      border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;

      cursor: pointer;
      transition: 150ms;
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0)')};

      &:hover {
        background: ${({ theme }) => theme.colors.base.blue};
        border-color: ${({ theme }) => theme.colors.base.blue};
        color: ${({ theme }) => theme.colors.general.background};
      }
    }
  }

  ul {
    font-size: 14px;
    margin-top: -5px;
    padding: 0 0 6px 24px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

    li {
      padding: 6px 0;

      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        padding: 6px 0;
        display: flex;
        align-items: center;
      }

      span.text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      svg {
        flex-shrink: 0;
        margin-right: 6px;
        stroke-width: 1.5px;
      }
    }

    &:last-child {
      padding: 12px;
      border-bottom: none;

      li {
        padding: 8px 12px;
        justify-content: unset;

        &:last-child {
          border-radius: 4px;
          color: ${({ theme }) => theme.colors.base.blue};
          background: ${({ theme }) => theme.colors.base.blue}40;
        }
      }
    }
  }

  @media (max-width: 1025px) {
    display: none;
  }
`;
