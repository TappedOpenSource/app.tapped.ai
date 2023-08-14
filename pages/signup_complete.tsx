import AppStoreButton from '@/components/appstorebuttons/AppStoreButton';
import GooglePlayButton from '@/components/appstorebuttons/GooglePlayButton';
import withAuth from '@/domain/auth/withAuth';
import withSubscription from '@/domain/auth/withSubscription';
import { logout } from '@/domain/usecases/login';
import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const SignupComplete: NextPage = () => {
  const appleUrl = 'https://apps.apple.com/us/app/tapped-app/id1574937614';
  const googleUrl = 'https://play.google.com/store/apps/details?id=com.intheloopstudio';

  const router = useRouter();

  const signout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl text-6xl text-center font-bold">application complete</h1>
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
        <div className="pb-16"></div>
        <Button onClick={signout} className="text-white">
          sign out
        </Button>
      </div>
    </>
  );
};

export default withAuth(SignupComplete);
