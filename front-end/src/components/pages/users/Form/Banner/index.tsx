import { Container } from './styles';
import { createAccountBanner } from '@libs/helpers/images';

const Banner: React.FC = () => {
  return (
    <Container>
      <img src={createAccountBanner} alt="Brands that use Monday" />
    </Container>
  );
};

export default Banner;
