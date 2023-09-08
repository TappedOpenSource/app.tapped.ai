import '@/styles/index.css';

import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import firebase from '@/utils/firebase';
console.log(firebase.app.name);


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
