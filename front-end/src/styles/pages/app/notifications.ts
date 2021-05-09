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
`;

export const LoadingContainer = styled.div`
  width: 100%;
  margin-top: 64px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
