import styled from 'styled-components';

export const Container = styled.div`
  width: 255px;
  height: 100vh;

  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  div.header {
    width: 100%;
    height: 64px;
    position: relative;

    padding: 0 24px;
    display: flex;
    align-items: center;

    h2 {
      font-size: 20px;
    }

    span {
      position: absolute;
      right: -13.5px;

      width: 26px;
      height: 26px;

      border-radius: 50%;
      background: ${({ theme }) => theme.colors.general.background};
      border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
    }
  }

  ul {
    font-size: 14px;

    margin-top: -5px;
    padding: 0 0 6px 24px;
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

      svg {
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
