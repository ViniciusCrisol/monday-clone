import { Container } from './styles';

export interface ButtonProps {
  color?: 'green' | 'red' | 'yellow';
}

const Button: React.FC<ButtonProps> = ({ children, color }) => {
  return <Container color={color}>{children}</Container>;
};

export default Button;
