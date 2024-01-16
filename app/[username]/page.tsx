'use client';

import UserProfileView from '@/components/UserProfileView';

export default function Page({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;

  return (
    <>
      <head>
        <title>{username} on tapped</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="my live performance page"
        />
        <meta property="og:site_name" content="tapped.ai" />
        <meta
          property="og:description"
          content="my live performance page"
        />
        <meta
          property="og:title"
          content="Tapped Ai : world's first Ai label"
        />
        <meta property="og:image" content="https://tapped.ai/download_og.png"></meta>
        <meta property="og:url" content="https://tapped.ai"></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tapped Ai : world's first Ai label"
        />
        <meta
          name="twitter:description"
          content="we want to sign you to our label. apply for free"
        />
        <meta property="twitter:image" content="https://tapped.ai/download_og.png"></meta>
      </head>
      <UserProfileView username={username} />
    </>
  );
}
