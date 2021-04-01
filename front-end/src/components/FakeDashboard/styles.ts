import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.others['dark-blue']};

  div.main-container {
    width: 100%;
    height: 100vh;

    display: flex;
    border-radius: 12px 0px 0px 0px;
    background: ${({ theme }) => theme.colors.general.background};

    div.boards-menu {
      width: 255px;
      height: 100vh;
      border-right: 1px solid
        ${({ theme }) => theme.colors.others['light-gray']};

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
        border-bottom: 1px solid
          ${({ theme }) => theme.colors.others['light-gray']};

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
            padding: 6px 12px;
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
    }
  }

  div.side-menu {
    width: 66px;
    height: 100vh;

    flex-shrink: 0;
    padding: 12px 0 16px 0;
    background: ${({ theme }) => theme.colors.others['dark-blue']};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    > div {
      img {
        max-width: 40px;
      }
    }
  }
`;

export const Dashboard = styled.div`
  width: 100%;

  > div.header {
    width: 100%;
    height: 122.5px;

    padding: 30px 44px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

    display: flex;
    flex-direction: column;

    h1 {
      display: flex;
      align-items: center;

      svg {
        margin-left: 10px;
        fill: ${({ theme }) => theme.colors.others['light-gray']};
        stroke: ${({ theme }) => theme.colors.others['light-gray']};
      }
    }

    > div {
      display: flex;
      align-items: center;

      padding-top: 6px;
      margin-left: auto;

      > span {
        font-size: 16px;
        color: ${({ theme }) => theme.colors.others['dark-gray']};

        & + span {
          margin: 0 16px;
        }
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 12px;
        border-radius: 4px;
        background: ${({ theme }) => theme.colors.general.background};
        border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

        font-size: 16px;
        color: ${({ theme }) => theme.colors.others['dark-gray']};

        & + button {
          margin-left: 16px;
          span {
            color: ${({ theme }) => theme.colors.base.blue};
          }
        }
      }

      @media (max-width: 1025px) {
        display: none;
      }
    }
  }
`;
