import styled, { css } from 'styled-components';

interface IContainer {
  isField: boolean;
  isFocused: boolean;
}

export const Container = styled.label<IContainer>`
  width: 100%;
  height: 36px;

  padding-left: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.general.background};
  border: 2px solid ${({ theme }) => theme.colors.others['light-gray']};

  display: flex;
  align-items: center;

  cursor: text;
  transition: border 100ms;

  & + label {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.general.text};

    &::placeholder {
      color: ${({ theme }) => theme.colors.others['dark-gray']};
    }
  }

  svg {
    flex-shrink: 0;
    margin-right: 16px;
    transition: stroke 100ms;
    stroke: ${({ theme }) => theme.colors.others['light-gray']};
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${({ theme }) => theme.colors.base.blue};

      svg {
        stroke: ${({ theme }) => theme.colors.base.blue};
      }
    `}

  ${({ isField }) =>
    isField &&
    css`
      border-color: ${({ theme }) => theme.colors.base.blue};

      svg {
        stroke: ${({ theme }) => theme.colors.base.blue};
      }
    `}
`;
