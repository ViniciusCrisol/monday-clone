import styled from 'styled-components';

export const Container = styled.div`
  button {
    margin-top: 10px;
  }

  input {
    height: 25px;
    width: 200px;

    display: block;
    padding: 0 5px;
    border: 1px solid ${({ theme }) => theme.colors.primary};

    & + input {
      margin-top: 5px;
    }
  }
`;
