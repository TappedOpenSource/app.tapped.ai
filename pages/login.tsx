'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { loginWithCredentials } from '@/domain/usecases/login';
import SignInWithGoogleButton from '@/components/signin_with_google_button';
import ContinueWithGoogleButton from '@/components/continue_with_google_button';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const query = router.query;
  const returnTo = (query.returnUrl as string) || '/signup_complete';
  console.log({ returnTo });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await loginWithCredentials({
        email: email,
        password: password,
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
    <div className="flex flex-col justify-center items-center min-h-screen rounded-lg p-16">
      <div className="flex items-center justify-center pb-5">
        <Image
          src="/images/icon_1024.png"
          alt="Tapped_Logo"
          width={124}
          height={124}
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
              onChange={(e: any) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            ></input>
          </div>
        </div>
        <div className="h-8" />
        <div className='flex flex-col gap-4'>
          <button
            className="bg-blue-700 px-4 py-2 rounded-full text-white font-bold"
            type="submit">
            login
          </button>
          <ContinueWithGoogleButton onClick={handleGoogleLogin} />
        </div>
        <div className='flex justify-center'>
          <Link href="/signup" className="text-blue-700 hover:text-blue-900 text-center">
              Don&apos;t have an account? Sign up
          </Link>
        </div>
      </form >
    </div >
  );
}
