import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import './globals.css';

const title = 'tapped ai : create world tour from your iphone';
const description = 'live music data with superpowers';

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
      <head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
