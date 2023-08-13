import withSubscription from '@/domain/auth/withSubscription';
import type { NextPage } from 'next';

const SignupComplete: NextPage = () => {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-6xl text-center font-bold">Application Complete</h1>
        <p className="text-center">
        thank you for your application.
        </p>
        <p className="text-center">
          we will contact you shortly.
        </p>
      </div>
    </>
  );
};

export default withSubscription(SignupComplete);
