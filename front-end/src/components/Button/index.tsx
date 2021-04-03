import { Container } from './styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSquare?: boolean;
  color?: 'green' | 'red' | 'yellow';
}

const Button: React.FC<ButtonProps> = ({
  color,
  isSquare,
  children,
  ...rest
}) => {
  return (
    <Container {...rest} color={color} isSquare={isSquare}>
      {children}
    </Container>
  );
};

export default Button;
