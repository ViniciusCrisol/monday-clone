import { Container } from './styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'green' | 'red' | 'yellow';
  isSquare?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isSquare,
  color,
  ...rest
}) => {
  return (
    <Container {...rest} color={color} isSquare={isSquare}>
      {children}
    </Container>
  );
};

export default Button;
