import { useEffect, useState } from 'react';
import withAuth from '@/domain/auth/withAuth';
import { logout } from '@/domain/usecases/login';
import { Button } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import RiveComponent from '@rive-app/react-canvas';
import Link from 'next/link';

const SignupComplete: NextPage = () => {
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
              (don&apos;t close this window.)
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-6xl text-center font-bold">you&apos;ve been approved!</h1>
        <div className="py-1"></div>
        <p className="text-center w-4/5 md:w-1/3">
          due to a high volume of applications, we are currently only accepting around 10 artists every couple weeks.
          we will notify you via SMS and email if you&apos;re selected for the next batch.
          <br />
          <br />
          <br />
          <br />
          if you want to guarantee your spot in our next batch of beta testers
          (<span className='font-bold text-red-500'>and get a discount</span>),
          you can pre-order the first month using the link below.
          <br />
          (use the code APPROVED for the discount)
        </p>
        <div className="py-1"></div>
        <Link
          href="https://buy.stripe.com/00g9CseCE2jubC0bIM"
          className="bg-blue-500 px-4 py-2 mt-8 mb-4 text-lg font-bold rounded-lg hover:scale-105 transform transition-all duration-200 ease-in-out shadow-lg"
        >
          pre-order here
        </Link>
        <div className="pb-16"></div>
        <Button onClick={signout} className="text-white">
          sign out
        </Button>
      </div>
    </>
  );
};

export default withAuth(SignupComplete);
