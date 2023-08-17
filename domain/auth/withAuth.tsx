import React, { useEffect } from 'react';
import router from 'next/router';
import firebase from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const withAuth = (Component) => (props) => {
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (authUser) => {
      if (!authUser) {
        router.push('/login');
      }
    });
  }, []);

  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withAuth;
