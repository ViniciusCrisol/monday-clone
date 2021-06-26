import styled from 'styled-components';

export const Container = styled.div`
  width: max-content;
  padding: 0 30px;

  & + div {
    margin-top: 48px;
  }

  > div {
    display: grid;
    grid-template-columns: 636px repeat(7, minmax(140px, 180px));
  }

  > div.header-group {
    height: 40px;
    align-items: center;

    > span {
      text-align: center;

      & + span {
        margin-left: 1px;
      }

      h2 {
        font-size: 18px;
        font-weight: normal;

        display: flex;
        align-items: center;

        span {
          width: 20px;
          height: 20px;

          flex-shrink: 0;
          margin-right: 12px;
          border-radius: 50%;
          background: ${({ theme }) => theme.colors.base.blue};
          color: ${({ theme }) => theme.colors.general.background};

          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
