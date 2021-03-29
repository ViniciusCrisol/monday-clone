import styled, { css } from 'styled-components';

interface ContainerProps {
  isField: boolean;
  isFocused: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 36px;

  padding: 0 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.general.background};
  border: 2px solid ${({ theme }) => theme.colors.others['light-gray']};

  display: flex;
  align-items: center;
  transition: border 100ms;

  & + div {
    margin-top: 8px;
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

  input {
    flex: 1;
    padding: 16px 0;
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
    stroke: ${({ theme }) => theme.colors.base.blue};
  }
`;
