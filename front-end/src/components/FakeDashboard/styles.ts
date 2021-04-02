import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.others['dark-blue']};
`;

const borderStyle = css`
  position: absolute;
  top: 0;

  content: '';
  width: 10px;
  height: calc(100% + 1px);
  background: ${({ theme }) => theme.colors.base.blue};
`;

export const Row = styled.div`
  &:last-child {
    grid-template-columns: 1fr;
  }

  span {
    height: 34px;
    padding: 0 12px;
    margin-bottom: 2px;
    background: ${({ theme }) => theme.colors.others['card-background']};
    border-bottom: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child,
    &:last-child {
      position: relative;
    }

    &:first-child {
      padding-left: 24px;
      margin-left: 33.4px;
      justify-content: unset;

      &::after {
        left: 0;
        ${borderStyle}
      }
    }

    &:last-child {
      &::before {
        right: 0;
        ${borderStyle}
      }
    }

    & + span {
      margin-left: 2px;
    }
  }
`;
