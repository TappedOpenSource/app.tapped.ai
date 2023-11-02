import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from '@/utils/userCookie';

export const mapUserData = async (user) => {
  const { uid, email } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
  };
};


const useUser = () => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    token: string;
  } | null>(null);
  const router = useRouter();

  const logout = async () => {
    return auth
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(auth, async (userToken) => {
      if (userToken) {
        const userData = await mapUserData(userToken);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      return;
    }
    setUser(userFromCookie);
    return () => {
      cancelAuthListener();
    };
  }, []);

  return { user, logout };
};

export { useUser };
