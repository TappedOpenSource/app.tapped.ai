import type { NextPage } from 'next/types';
import withSubscription from '@/domain/auth/withSubscription';

const Team: NextPage = () => {
  return (
    <>
      <h1>Team</h1>
    </>
  );
};

export default withSubscription(Team);
