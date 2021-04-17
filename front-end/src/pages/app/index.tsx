import { GetServerSideProps } from 'next';

const Index: React.FC = () => {
  return <div />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/app/home',
      permanent: false
    }
  };
};

export default Index;
