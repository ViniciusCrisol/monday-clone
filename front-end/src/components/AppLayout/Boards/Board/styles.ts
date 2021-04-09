import styled from 'styled-components';

export const Container = styled.li`
  padding: 8px 12px;
  border-radius: 4px;

  a {
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  svg {
    flex-shrink: 0;
    margin-right: 6px;
    stroke-width: 1.5px;
  }

  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => theme.colors.others['light-blue']};
  }

  &.active {
    color: ${({ theme }) => theme.colors.others['dark-blue']};
    background: ${({ theme }) => theme.colors.others['light-blue']};
  }
`;
