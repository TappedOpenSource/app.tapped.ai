import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Option, Some, None } from '@sniptt/monads';
import { onIdTokenChanged } from 'firebase/auth';
import firebase from '../../utils/firebase';
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from '../../utils/userCookie';

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
  const [user, setUser] = useState<Option<{
    id: string;
    email: string;
    token: string;
  }>>(None);
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth
      .signOut()
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(firebase.auth, async (userToken) => {
      if (userToken) {
        const userData = await mapUserData(userToken);
        setUserCookie(userData);
        setUser(Some(userData));
      } else {
        removeUserCookie();
        setUser(None);
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
