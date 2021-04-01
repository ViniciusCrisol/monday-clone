import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  > div.form-container {
    width: 100vw;
    height: 100vh;

    position: absolute;
    z-index: 50;
    left: 0;
    top: 0;

    padding: 10px;
    background: rgba(22, 22, 49, 0.7);

    display: none;
    align-items: center;
    justify-content: center;

    form {
      height: 100%;
      max-height: 535px;
      width: 100%;
      max-width: 780px;

      padding: 6px;
      border-radius: 12px;
      background: ${({ theme }) => theme.colors.general.background};

      display: flex;
      justify-content: space-between;

      > div.main {
        width: 100%;
        max-width: 520px;

        flex: 1;
        padding: 48px 56px;

        h1 {
          font-size: 24px;
          margin-bottom: 48px;
        }

        button {
          width: 100%;
          margin: 16px 0;
        }

        a {
          text-align: center;
          text-decoration: underline;

          display: block;
          margin-top: 32px;
          transition: color 200ms;

          &:hover {
            color: ${({ theme }) => theme.colors.base.blue};
          }
        }
      }

      > div.image-container {
        height: 100%;
        background: #f5f6f8;
        border-radius: 0 6px 6px 0;
      }

      @media (max-width: 801px) {
        > div.main {
          width: 100%;
          max-width: unset;
        }

        > div.image-container {
          display: none;
        }
      }

      @media (max-width: 480px) {
        > div.main {
          padding: 16px;
        }
      }
    }
  }
`;
