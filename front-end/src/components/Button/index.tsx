import { Container } from './styles';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSquare?: boolean;
  color?: 'green' | 'red' | 'yellow';
}

const Button: React.FC<IButton> = ({ color, isSquare, children, ...rest }) => {
  return (
    <Container {...rest} color={color} isSquare={isSquare}>
      {children}
    </Container>
  );
};

export default Button;
