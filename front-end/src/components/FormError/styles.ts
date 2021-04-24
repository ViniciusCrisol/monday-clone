import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 26px;

  font-size: 15px;
  color: ${({ theme }) => theme.colors.base.red};

  display: flex;
  padding: 4px 2px;

  svg {
    margin-right: 5px;
  }
`;
