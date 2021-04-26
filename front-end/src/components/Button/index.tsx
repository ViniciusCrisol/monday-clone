import Loading from './Loading';
import { Container } from './styles';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  isSquare?: boolean;
  color?: 'green' | 'red' | 'yellow';
}

const Button: React.FC<IButton> = ({
  color,
  loading,
  isSquare,
  children,
  ...rest
}) => {
  return (
    <Container {...rest} disabled={loading} color={color} isSquare={isSquare}>
      {loading ? <Loading /> : children}
    </Container>
  );
};

export default Button;
