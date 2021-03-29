import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a.button {
    height: 40px;
    min-width: 175px;

    padding: 0 16px;
    margin-left: 16px;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.base.blue};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: background 200ms;
    color: ${({ theme }) => theme.colors.general.background};

    &:hover {
      background: ${({ theme, color }) => darken(0.08, theme.colors.base.blue)};
    }

    svg {
      margin-left: 8px;
    }
  }
`;
