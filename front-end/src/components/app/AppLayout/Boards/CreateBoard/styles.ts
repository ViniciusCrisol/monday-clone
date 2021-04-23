import styled from 'styled-components';
import { Form } from '@unform/web';

export const Container = styled(Form)`
  width: 100%;
  max-width: 540px;

  padding: 32px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.general.background};

  div.button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      width: 100%;
      margin-top: 8px;

      & + button {
        margin-left: 16px;
      }
    }
  }
`;
