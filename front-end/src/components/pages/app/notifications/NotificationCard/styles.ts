import styled from 'styled-components';

export const Container = styled.li`
  min-height: 120px;

  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

  > .card-content strong {
    max-width: 100px;

    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.others['light-gray']};

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;

    > button {
      cursor: pointer;

      height: 28px;
      border-radius: 4px;
      border: 2px solid ${({ theme }) => theme.colors.others['light-gray']};

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 5px;
      }

      & + button {
        margin-left: 8px;
      }
    }
  }
`;
