import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  width: 100%;
  height: 122px;

  padding: 30px 44px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  display: flex;
  flex-direction: column;

  h1 {
    display: flex;
    align-items: center;
  }

  > div {
    gap: 16px;
    display: flex;
    align-items: center;

    padding-top: 6px;
    margin-left: auto;

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 12px;
      border-radius: 4px;
      background: ${({ theme }) => theme.colors.general.background};
      border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

      font-size: 16px;
      color: ${({ theme }) => theme.colors.others['dark-gray']};

      span {
        color: ${({ theme }) => theme.colors.base.blue};
      }
    }
  }

  @media (max-width: 1025px) {
    > div {
      margin-left: 0;
    }
  }

  @media (max-width: 600px) {
    height: auto;

    h1 {
      margin-bottom: 8px;
    }

    > div {
      gap: 8px;
      flex-direction: column;

      div {
        width: 100%;
      }
    }
  }
`;
