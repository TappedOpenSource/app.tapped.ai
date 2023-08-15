// import AppStoreButton from '@/components/appstorebuttons/AppStoreButton';
// import GooglePlayButton from '@/components/appstorebuttons/GooglePlayButton';
import { useEffect, useState } from 'react';
import withAuth from '@/domain/auth/withAuth';
import { logout } from '@/domain/usecases/login';
import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import RiveComponent from '@rive-app/react-canvas';
import Link from 'next/link';

const SignupComplete: NextPage = () => {
  // const appleUrl = 'https://apps.apple.com/us/app/tapped-app/id1574937614';
  // const googleUrl = 'https://play.google.com/store/apps/details?id=com.intheloopstudio';
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  });

  const router = useRouter();

  const signout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <>
        <div className='h-screen w-screen flex justify-center items-center bg-white pr-4 pl-4'>
          <div>
            <div className="flex flex-row justify-center">
              <RiveComponent
                src="/loading_logo.riv"
                className="base-canvas-size h-48 w-48" />
            </div>
            <h1 className="text-black text-2xl md:text-6xl text-center font-bold">reviewing your profile</h1>
            <p className="text-black text-center">
              hang tight to see if you&apos;re accepted.
            </p>
            <p className="text-black text-center">
              (don&apos;t close this window)
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-6xl text-center font-bold">application complete</h1>
        <p className="text-center">
          you have been approved!
        </p>
        <div className="pb-12"></div>
        <Link
          href="/pricing"
          className="bg-[#202020] px-4 py-2 mt-8 mb-4 text-lg font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ease-in-out shadow-lg"
        >
          reserve your spot here
        </Link>
        {/* <div className="pb-8"></div>
        <div className="flex justify-center items-center flex-col md:flex-row gap-4">
          <GooglePlayButton
            url={googleUrl}
            theme={'dark'}
          />
          <AppStoreButton
            url={appleUrl}
            theme={'dark'}
          />
        </div> */}
        <div className="pb-16"></div>
        <Button onClick={signout} className="text-white">
          sign out
        </Button>
      </div>
    </>
  );
};

export default withAuth(SignupComplete);
