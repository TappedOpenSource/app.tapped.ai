'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { loginWithCredentials } from '@/domain/usecases/login';
import SignInWithGoogleButton from '@/components/signin_with_google_button';

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const query = router.query;
  const returnTo = (query.returnUrl as string) || '/signup_complete';
  console.log({ returnTo });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await loginWithCredentials({
        email: data.email,
        password: data.password,
      });
      router.push(returnTo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      router.push(returnTo);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 gap-2 rounded-lg bg-[#FFF] p-16 shadow-lg">
      <div className="flex items-center justify-center pb-5">
        <Image
          src="/images/tapped_logo.png"
          alt="Tapped_Logo"
          width={330}
          height={90}
        />
      </div>

      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="inline-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="inline-email"
              type="text"
              placeholder=""
              onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              value={data.email || ''}
            ></input>
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className="md:w-1/3">
            <label
              className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="inline-password"
              type="password"
              placeholder=""
              onChange={(e: any) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              value={data.password || ''}
            ></input>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <Link href={`/signup?returnUrl=${returnTo}`}>
              <button className="tapped_signup_btn">Sign Up</button>
            </Link>
          </div>
          <div className="md:w-2/3">
            <button className="tapped_btn w-full" type="submit">
              Login
            </button>
            <SignInWithGoogleButton onClick={handleGoogleLogin} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
