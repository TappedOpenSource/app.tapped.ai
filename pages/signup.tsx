import type { NextPage } from 'next/types';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signupWithCredentials } from '@/domain/usecases/signup';

const Signup: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const query = router.query;
  const returnTo = (query.returnUrl as string) || '/tmp_home';
  const [inputColor, setInputColor] = useState('white');

  const handleSignup = async (e) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    const email = data.email;
    console.log({ password, confirmPassword, email, inputColor });
    console.log();
    if (data.password !== data.confirmPassword) {
      console.log('passwords do not match'); e.preventDefault(); setInputColor('red'); return;
    }
    setInputColor('black');
    e.preventDefault();
    console.log('signup');
    try {
      await signupWithCredentials({
        email: data.email,
        password: data.password,
      });
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
          width={180}
          height={180}
        />
      </div>

      <form className="w-full max-w-sm" onSubmit={handleSignup}>
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
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email || ''}
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className= 'md:w-1/3'>
            <label
              className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="inline-password"
            >
            Password
            </label><p></p>
          </div>
          <div className="md:w-2/3">
            <input
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="inline-password"
              type="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password || ''}
            />
          </div>
        </div>
        <div className="mb-6 md:flex md:items-center">
          <div className= 'md:w-1/3'>
            <label
              className="mb-1 block pr-4 text-xs font-bold text-gray-500 md:mb-0 md:text-right"
              htmlFor="inline-password"
            >
            Confirm Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              style={{ borderColor: inputColor }} type = 'password'
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="confirm-password"
              // type="password"
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-6 flex md:items-center">
          <button className="tapped_btn w-full bg-blue-700 px-4 py-2 rounded-full text-white font-bold" type="submit">
            Sign Up
          </button></div>
        <div className="mb-6 flex items-center"><div >
          <Link href={`/login?returnUrl=${returnTo}`}>
            <button className="tapped_signup_btn">Login</button>
          </Link>
        </div></div>
      </form>
    </div>
  );
};

export default Signup;
