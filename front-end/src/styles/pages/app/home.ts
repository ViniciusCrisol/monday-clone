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
  height: 120px;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  & + li {
    margin-top: 15px;
  }

  > div.header {
    height: 76px;

    > div.image-container {
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
`;
