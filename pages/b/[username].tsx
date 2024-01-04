'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserModel } from '@/domain/models/user_model';
import { getUserByUsername } from '@/data/database';
import InstagramButton from '@/components/profile/InstagramButton';
import TwitterButton from '@/components/profile/TwitterButton';
import TiktokButton from '@/components/profile/TiktokButton';
import SpotifyButton from '@/components/profile/SpotifyButton';
import Head from 'next/head';
import BookerBookingHistoryPreview from '@/components/profile/BookerBookingHistoryPreview';
import BookerReviewsPreview from '@/components/profile/BookerReviewsPreview';
import OpportunitiesSlider from '@/components/profile/OpportunitiesSlider';

const PageMetadata = ({ username }: { username: string | string[] }) => (
  <Head>
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
  </Head>
);

export default function Page() {
  const router = useRouter();
  const username = router.query.username;
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof username !== 'string') {
        return;
      }

      // get user by username
      const user = await getUserByUsername(username);
      user.match({
        some: (user) => {
          // set user
          setUser(user);
        },
        none: () => {
          console.log('user not found');
          router.push('/404');
        },
      });
    };
    fetchUser();
  }, [router, username]);

  if (user === null) {
    return (
      <>
        <PageMetadata username={username} />
        <div className='min-h-screen flex justify-center items-center'>
          <p>fetching {username}... </p>
        </div>
      </>
    );
  }

  const profileImage = (() => {
    if (
      user.profilePicture === undefined ||
      user.profilePicture === null ||
      user.profilePicture === '') {
      return '/images/default_avatar.png';
    }

    return user.profilePicture;
  })();

  const audienceSize = (user.twitterFollowers ?? 0) +
    (user.instagramFollowers ?? 0) +
    (user.tiktokFollowers ?? 0);

  return (
    <>
      <PageMetadata username={username} />
      <div className='relative h-[256px] w-screen overflow-hidden'>
        <Image
          src={profileImage}
          alt={`${user.artistName} profile picture`}
          objectFit='cover'
          objectPosition='center'
          fill
        />
      </div>
      <div className='md:flex md:justify-center'>
        <div className='py-4 px-6 md:w-1/2'>
          <div>
            <h1 className='text-4xl font-extrabold'>{user.artistName}</h1>
            <p className='text-sm text-gray-500'>@{user.username}</p>
          </div>
          <div className='h-4' />
          {/* <div>
            <h2 className='text-2xl font-bold'>Pricings</h2>
            <p>the prices</p>
          </div>
          <div className='h-4' /> */}
          <div className='flex flex-row items-center justify-around'>
            {audienceSize > user.followerCount ?
              (
                <div className='flex flex-col justify-center items-center'>
                  <h3 className='text-2xl font-bold'>{audienceSize}</h3>
                  <p className='text-xs text-font text-gray-500'>audience</p>
                </div>
              ) : (
                <div className='flex flex-col justify-center items-center'>
                  <h3 className='text-2xl font-bold'>{user.followerCount ?? 0}</h3>
                  <p className='text-xs text-font text-gray-500'>followers</p>
                </div>
              )}
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{user.reviewCount ?? 0}</h3>
              <p className='text-xs text-font text-gray-500'>reviews</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{user.overallRating ? `${user.overallRating}/5` : 'N/A'}</h3>
              <p className='text-sm text-gray-400'>rating</p>
            </div>
          </div>
          <div className='h-4' />
          <div className='flex flex-row items-center justify-around'>
            {user.instagramHandle && <InstagramButton instagramHandle={user.instagramHandle} />}
            {user.twitterHandle && <TwitterButton twitterHandle={user.twitterHandle} />}
            {user.tiktokHandle && <TiktokButton tiktokHandle={user.tiktokHandle} />}
            {user.spotifyId && <SpotifyButton spotifyId={user.spotifyId} />}
          </div>
          <div className='h-4' />
          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Performance Opportunities</h2>
            </div>
            <div className="h-2" />
            <OpportunitiesSlider user={user} />
          </div>
          <div className='h-4' />
          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Reviews</h2>
              <div className='w-2' />
              <Link
                href={`/b/reviews/${user.id}`}
                className='text-sm text-blue-500'
              >
                see all
              </Link>
            </div>
            <div className="h-2" />
            <BookerReviewsPreview user={user} />
          </div>
          <div className='h-4' />
          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Booking History</h2>
              <div className='w-2' />
              <Link
                href={`/b/history/${user.id}`}
                className='text-sm text-blue-500'
              >
                see all
              </Link>
            </div>
            <div className="h-2" />
            <BookerBookingHistoryPreview user={user} />
          </div>
          <div className='h-4' />
          <div>
            <h2 className='text-2xl font-bold'>More Info</h2>
            <div className="h-2" />
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
