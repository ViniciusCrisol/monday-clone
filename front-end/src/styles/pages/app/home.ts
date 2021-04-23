import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 40px 40px 10px;

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;

export const Feed = styled.div`
  max-width: 754px;
  width: 100%;
`;

export const HeaderFeed = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;

    > div {
      margin-top: 8px;
      margin-left: unset;
    }
  }
`;

export const CardList = styled.ul`
  width: 100%;
  margin-top: 25px;
`;

export const Card = styled.li`
  min-height: 120px;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  & + li {
    margin-top: 15px;
  }

  pre {
    margin-top: 4px;
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
