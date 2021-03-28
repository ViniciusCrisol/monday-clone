import styled from 'styled-components';
import { darken } from 'polished';
import { ButtonProps } from './index';

export const Container = styled.button<ButtonProps>`
  height: 40px;
  min-width: 175px;

  border-radius: 20px;
  padding: 0 16px;
  background: ${({ theme, color }) => theme.colors[color] || theme.colors.blue};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: background 200ms;
  color: ${({ theme }) => theme.colors.button};

  &:hover {
    background: ${({ theme, color }) =>
      darken(0.08, theme.colors[color] || theme.colors.blue)};
  }

  svg {
    margin-left: 8px;
  }
`;
