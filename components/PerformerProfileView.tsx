'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserModel, audienceSize, profileImage, reviewCount } from '@/domain/models/user_model';
import PerformerBookingHistoryPreview from '@/components/profile/PerformerBookingHistoryPreview';
import { getUserByUsername } from '@/data/database';
import PerformerReviewsPreview from '@/components/profile/PerformerReviewsPreview';
import InstagramButton from '@/components/profile/InstagramButton';
import TwitterButton from '@/components/profile/TwitterButton';
import TiktokButton from '@/components/profile/TiktokButton';
import SpotifyButton from '@/components/profile/SpotifyButton';

export default function PerformerProfileView({ username }: { username: string }) {
  const router = useRouter();
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
        <div className='min-h-screen flex justify-center items-center'>
          <p>fetching {username}... </p>
        </div>
      </>
    );
  }

  const imageSrc = profileImage(user);
  const audience = audienceSize(user);

  return (
    <>
      <div className='md:flex md:justify-center'>
        <div className='py-4 px-6 md:w-1/2'>
          <div className='flex flex-row justify-start items-center'>
            <div className='relative w-[128px] h-[128px] lg:h-[256px] lg:w-[256px] overflow-hidden rounded-full'>
              <Image
                src={imageSrc}
                alt={`${user.artistName} profile picture`}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }} />
            </div>
            <div className="w-4" />
            <div>
              <h1 className='text-4xl lg:text-8xl font-extrabold'>{user.artistName}</h1>
              <p className='text-sm lg:text-xl text-gray-500'>@{user.username}</p>
            </div>
          </div>
          <div className='h-4' />
          {/* <div>
            <h2 className='text-2xl font-bold'>Pricings</h2>
            <p>the prices</p>
          </div>
          <div className='h-4' /> */}
          <div className='flex flex-row items-center justify-around'>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{audience.toLocaleString()}</h3>
              <p className='text-xs text-font text-gray-500'>audience</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{reviewCount(user)}</h3>
              <p className='text-xs text-font text-gray-500'>reviews</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{user.performerInfo?.rating ? `${user.performerInfo?.rating}/5` : 'N/A'}</h3>
              <p className='text-sm text-gray-400'>rating</p>
            </div>
          </div>
          <div className='h-4' />
          <div className='flex flex-row items-center justify-around'>
            {user.socialFollowing.instagramHandle && <InstagramButton instagramHandle={user.socialFollowing.instagramHandle} />}
            {user.socialFollowing.twitterHandle && <TwitterButton twitterHandle={user.socialFollowing.twitterHandle} />}
            {user.socialFollowing.tiktokHandle && <TiktokButton tiktokHandle={user.socialFollowing.tiktokHandle} />}
            {user.performerInfo?.spotifyId && <SpotifyButton spotifyId={user.performerInfo.spotifyId} />}
          </div>
          <div className='h-4' />

          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Booking History</h2>
              <div className='w-2' />
              <Link
                href={`/history/${user.id}`}
                className='text-sm text-blue-500'
              >
                see all
              </Link>
            </div>
            <div className="h-2" />
            <PerformerBookingHistoryPreview user={user} />
          </div>
          <div className='h-8' />
          <div>
            <div className='flex flex-row items-center'>
              <h2 className='text-2xl font-bold'>Reviews</h2>
              <div className='w-2' />
              <Link
                href={`/reviews/${user.id}`}
                className='text-sm text-blue-500'
              >
                see all
              </Link>
            </div>
            <div className="h-2" />
            <PerformerReviewsPreview user={user} />
          </div>
          <div className='h-8' />
          <div>
            <h2 className='text-2xl font-bold'>About</h2>
            <div className="h-2" />
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
