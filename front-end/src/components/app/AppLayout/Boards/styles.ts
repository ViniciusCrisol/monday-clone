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
  transition: width 150ms;
  border-right: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  > div.loading-container {
    margin-top: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div.create-project {
    padding: 6px 12px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

    button {
      width: 100%;

      padding: 8px 12px;
      border-radius: 4px;
      background: ${({ theme }) => theme.colors.general.background};

      display: flex;
      align-items: center;
      justify-content: space-between;

      cursor: pointer;
      transition: 200ms;

      div {
        display: flex;
        align-items: center;

        svg {
          margin-right: 6px;
        }
      }

      svg {
        flex-shrink: 0;
        stroke-width: 1.5px;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.others['light-gray']};
      }
    }
  }

  @media (max-width: 1025px) {
    display: none;
  }
`;

export const Header = styled.div<BoardsMenuInterface>`
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
    transition: 200ms;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'rotate(0)')};

    &:hover {
      background: ${({ theme }) => theme.colors.base.blue};
      border-color: ${({ theme }) => theme.colors.base.blue};
      color: ${({ theme }) => theme.colors.general.background};
    }
  }
`;

export const BoardList = styled.ul<BoardsMenuInterface>`
  padding: 12px;
  font-size: 14px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;
