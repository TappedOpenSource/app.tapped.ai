import AppStoreButton from '@/components/appstorebuttons/AppStoreButton';
import GooglePlayButton from '@/components/appstorebuttons/GooglePlayButton';
import { logout } from '@/domain/usecases/login';
import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import withSubscription from '@/domain/auth/withSubscription';

const TmpHome: NextPage = () => {
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
        <h1 className="pb-4 text-5xl md:text-6xl text-center font-bold">
            you&apos;re in!
        </h1>
        <p className="text-center">
          you&apos;ve been accepted into tapped ai. <br />we&apos;ll reach out to you soon.
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

export default withSubscription(TmpHome);
