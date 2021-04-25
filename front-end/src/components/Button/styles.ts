import styled from 'styled-components';
import { darken } from 'polished';
import { IButton } from './index';

export const Container = styled.button<IButton>`
  height: 40px;
  min-width: 175px;

  padding: 0 16px;
  border-radius: ${({ isSquare }) => (isSquare ? '4px' : '20px')};
  background: ${({ theme, color }) =>
    theme.colors.base[color] || theme.colors.base.blue};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: background 200ms;
  color: ${({ theme }) => theme.colors.general.background};

  &:hover {
    background: ${({ theme, color }) =>
      darken(0.08, theme.colors.base[color] || theme.colors.base.blue)};
  }

  svg {
    margin-left: 8px;
  }
`;
