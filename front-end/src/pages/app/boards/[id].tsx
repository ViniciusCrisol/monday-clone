import { useRouter } from 'next/router';

import Layout from '@components/pages/app/AppLayout';

const Board: React.FC = () => {
  const router = useRouter();

  console.log(router.query.id);

  return (
    <Layout>
      <div />
    </Layout>
  );
};

export default Board;
