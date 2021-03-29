import { Container } from './styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'red' | 'yellow';
}

const Button: React.FC<ButtonProps> = ({ children, color, ...rest }) => {
  return (
    <Container {...rest} color={color}>
      {children}
    </Container>
  );
};

export default Button;
