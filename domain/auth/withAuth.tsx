import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// eslint-disable-next-line react/display-name
const withAuth = (Component) => (props: JSX.IntrinsicAttributes) => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (authUser) => {
      if (!authUser) {
        router.push({
          pathname: '/login',
          query: { returnUrl: router.pathname },
        });
      }
    });
  }, [router]);

  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withAuth;
