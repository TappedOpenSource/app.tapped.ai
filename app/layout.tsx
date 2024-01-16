'use client';

import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { app } from '@/utils/firebase';
console.log(app.name);

const title = 'Tapped Ai : world tour from your iPhone';
const description = 'apply to perform for FREE';

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
    children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={description}
        />
        <meta property="og:site_name" content="tapped.ai" />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          property="og:title"
          content={title}
        />
        <meta property="og:image" content="https://tapped.ai/og.png" />
        <meta property="og:url" content="https://tapped.ai" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={title}
        />
        <meta
          name="twitter:description"
          content={description}
        />
        <meta property="twitter:image" content="https://tapped.ai/og.png" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
