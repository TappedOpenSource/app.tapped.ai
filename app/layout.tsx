import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import './globals.css';
import Script from 'next/script';

const title = 'Tapped Ai : world tour from your iPhone';
const description = 'apply to perform for FREE';

export const metadata: Metadata = {
  metadataBase: new URL('https://tapped.ai'),
  title,
  description,
  openGraph: {
    type: 'website',
    url: 'https://tapped.ai',
    title,
    description,
    siteName: 'Tapped Ai',
    images: [{ url: 'https://tapped.ai/og.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tappedai',
    title,
    description,
    images: 'https://tapped.ai/og.png',
  },
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
      <script src='' async />
      <body>
        {children}
        <Analytics />
      </body>
      <Script
        src="instagram.js"
      />
    </html>
  );
}
