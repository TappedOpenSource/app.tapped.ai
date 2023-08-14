import AppStoreButton from '@/components/appstorebuttons/AppStoreButton';
import GooglePlayButton from '@/components/appstorebuttons/GooglePlayButton';
import withSubscription from '@/domain/auth/withSubscription';
import type { NextPage } from 'next';

const SignupComplete: NextPage = () => {
  const appleUrl = 'https://apps.apple.com/us/app/tapped-network/id1574937614';
  const googleUrl = 'https://play.google.com/store/apps/details?id=com.intheloopstudio';

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl text-6xl text-center font-bold">Application Complete</h1>
        <p className="text-center">
        thank you for your application.
        </p>
        <p className="text-center">
          we will contact you shortly.
        </p>
        <div className="pb-8"></div>
        <div className="flex justify-center items-center flex-col md:flex-row gap-4">
          <GooglePlayButton
            url={googleUrl}
            theme={'dark'}
          />
          <AppStoreButton
            url={appleUrl}
            theme={'dark'}
          />
        </div>
      </div>
    </>
  );
};

export default withSubscription(SignupComplete);
