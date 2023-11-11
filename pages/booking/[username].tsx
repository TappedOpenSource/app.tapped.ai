'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserModel } from '@/domain/models/user_model';
import BookingHistoryPreview from '@/components/profile/BookingHistoryPreview';
import { getUserByUsername } from '@/data/database';
import ReviewsPreview from '@/components/profile/ReviewsPreview';

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
          <div className='h-12' />
          {/* <div>
            <h2 className='text-2xl font-bold'>Pricings</h2>
            <p>the prices</p>
          </div>
          <div className='h-4' /> */}
          <div>
            <h2 className='text-2xl font-bold'>Reviews</h2>
            <ReviewsPreview userId={user.id} />
          </div>
          <div className='h-4' />
          <div>
            <h2 className='text-2xl font-bold'>Booking History</h2>
            <BookingHistoryPreview userId={user.id} />
          </div>
          <div className='h-4' />
          <div>
            <h2 className='text-2xl font-bold'>More Info</h2>
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
}
