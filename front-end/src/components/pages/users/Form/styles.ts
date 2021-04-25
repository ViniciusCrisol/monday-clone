import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled(Form)`
  height: 100%;
  max-height: 535px;
  width: 100%;
  max-width: 780px;

  padding: 6px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.general.background};

  display: flex;
  justify-content: space-between;

  > div.inputs-container {
    width: 100%;
    max-width: 520px;

    flex: 1;
    padding: 48px 56px;

    h1 {
      font-size: 24px;
      margin-bottom: 22px;
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

  @media (max-width: 801px) {
    > div.inputs-container {
      width: 100%;
      max-width: unset;
    }
  }

  @media (max-width: 480px) {
    > div.inputs-container {
      padding: 16px;
    }
  }
`;
