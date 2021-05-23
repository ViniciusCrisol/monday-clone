import { darken } from 'polished';
import styled from 'styled-components';

export const CardList = styled.ul`
  width: 100%;
  margin-top: 25px;

  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 801px) {
    grid-template-columns: 1fr;
  }
`;

export const RefreshButton = styled.button`
  width: 28px;
  height: 28px;

  padding: 6px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.base.blue};
  color: ${({ theme }) => theme.colors.general.background};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: ${({ theme }) => darken(0.08, theme.colors.base.blue)};
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  margin-top: 64px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
