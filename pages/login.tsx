"use client";

import React, { useState } from "react";
import firebase from "../utils/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const auth = firebase.auth;

const Login = () => {
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await googleLogin();
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
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
              value={data.email || ""}
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
              value={data.password || ""}
            ></input>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <Link href="/sign-up">
              <button className="tapped_signup_btn">Sign Up</button>
            </Link>
          </div>
          <div className="md:w-2/3">
            <button className="tapped_btn w-full" type="submit">
              Login
            </button>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="google_btn"
            >
              <svg
                className="-ml-1 mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
