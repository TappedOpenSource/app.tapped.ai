import type { NextPage } from 'next/types';
import withAuth from '../domain/auth/withAuth';

const Generator: NextPage = () => {
  return (
    <>
      <h1>Generator</h1>
    </>
  );
};

export default withAuth(Generator);
