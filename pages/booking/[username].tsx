'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserModel } from '@/domain/models/user_model';
import BookingHistoryPreview from '@/components/profile/BookingHistoryPreview';
import { getUserByUsername } from '@/data/database';
import ReviewsPreview from '@/components/profile/ReviewsPreview';
import InstagramButton from '@/components/profile/InstagramButton';
import TwitterButton from '@/components/profile/TwitterButton';
import TiktokButton from '@/components/profile/TiktokButton';
import SpotifyButton from '@/components/profile/SpotifyButton';

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
      <p>fetching {username}... </p>
    );
  }

  return (
    <>
      <div className='relative h-[256px] w-screen overflow-hidden'>
        <Image
          src={user.profilePicture}
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
            {user.instagramHandle && <InstagramButton instagramHandle={user.instagramHandle} />}
            {user.twitterHandle && <TwitterButton twitterHandle={user.twitterHandle} />}
            {user.tiktokHandle && <TiktokButton tiktokHandle={user.tiktokHandle} />}
            {user.spotifyId && <SpotifyButton spotifyId={user.spotifyId} />}
          </div>
          <div className='h-4' />
          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Reviews</h2>
              <div className='w-2' />
              <Link
                href="/booking/[username]/reviews"
                className='text-sm text-blue-500'
              >
                see all
              </Link>
            </div>
            <div className="h-2" />
            <ReviewsPreview user={user} />
          </div>
          <div className='h-4' />
          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Booking History</h2>
              <div className='w-2' />
              <Link
                href="/booking/[username]/history"
                className='text-sm text-blue-500'
              >
                see all
              </Link>
            </div>
            <div className="h-2" />
            <BookingHistoryPreview user={user} />
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
