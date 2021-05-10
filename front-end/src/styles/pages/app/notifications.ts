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
  border-radius: 6px;
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

export const Card = styled.li`
  min-height: 120px;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  pre {
    margin-top: 4px;
    white-space: inherit;
  }

  > div.header {
    margin-right: 8px;
    display: flex;
    align-items: center;

    > div.image-container {
      margin-right: 8px;

      img {
        width: 30px;
        height: 30px;
        flex-shrink: 0;
      }
    }

    > .card-info {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 14px;
      }
    }
  }

  .footer {
    margin-top: 8px;

    display: grid;
    grid-gap: 16px;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  margin-top: 64px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
