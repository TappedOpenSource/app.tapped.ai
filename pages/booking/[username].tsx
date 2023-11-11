'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
      <h1>{user.artistName}</h1>
      <p>{user.email}</p>
    </>
  );
}
