'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import database from '@/data/database';
import { UserModel } from '@/domain/models/user_model';

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
      const user = await database.getUserByUsername(username);
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
      <div className='py-4 px-6'>
        <div>
          <h1 className='text-4xl font-extrabold'>{user.artistName}</h1>
          <p className='text-sm text-gray-500'>{user.username}</p>
        </div>
        <div>
          <h2 className='text-2xl font-bold'>Services</h2>
        </div>
        <div className='text-2xl font-bold'>
          <h2>Reviews</h2>
        </div>
        <div className='text-2xl font-bold'>
          <h2>Booking History</h2>
        </div>
      </div>
    </>
  );
}
