import styled from 'styled-components';
import ButtonStyle from '../../Button';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a + a {
    margin-left: 16px;
  }
`;

export const Button = styled(ButtonStyle)``;
