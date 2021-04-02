import styled from 'styled-components';

export const Container = styled.div`
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
      margin-left: 0;
    }

    @media (max-width: 600px) {
      display: none;
    }
  }
`;
