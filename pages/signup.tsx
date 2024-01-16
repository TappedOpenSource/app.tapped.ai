import type { NextPage } from 'next/types';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signupWithCredentials } from '@/domain/usecases/signup';

const Signup: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const query = router.query;
  const returnTo = (query.returnUrl as string) || '/tmp_home';

  useEffect(() => {
    setError( !(password === confirmPassword) );
  }, [password, confirmPassword]);

  // const handleConfirmPassword = () => {
  //   const isMatch = password.length === confirmPassword.length && password.split('').every((char, index) => char === confirmPassword[index]);
  //   setError(!isMatch);
  //   return !isMatch;
  // };
  const handleSignup = async (e: any) => {
    // const password = useState(password);
    // const confirmPassword = useState(confirmPassword);
    // const email = email;
    console.log({ password, confirmPassword, email, error });
    console.log();
    e.preventDefault();
    if (error) {
      console.log('passwords do not match'); return;
    }
    console.log('signup');
    try {
      await signupWithCredentials({
        email: email,
        password: password,
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
          style={{
            maxWidth: '100%',
            height: 'auto',
          }} />
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
              onChange={(e: any) => setEmail(e.target.value)}
              value={email || ''}
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
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              value={password || ''}
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
              className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="confirm-password"
              // type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              style={{ borderColor: error ? 'red' : 'white' }} type = 'password'
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
