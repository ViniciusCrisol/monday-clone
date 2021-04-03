import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  width: 100%;
  height: 65px;

  padding: 12px;
  background: ${({ theme }) => theme.colors.others['card-background']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 44px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 360px;

  padding: 10px;
  margin-top: 54px;

  h1 {
    font-size: 24px;
    font-weight: normal;
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
`;
