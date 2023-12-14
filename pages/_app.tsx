import '@/styles/index.css';

import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { app } from '@/utils/firebase';
import Head from 'next/head';
console.log(app.name);


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tapped Ai</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
