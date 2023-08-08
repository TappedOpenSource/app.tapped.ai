import React, { useEffect } from 'react';
import router from 'next/router';
import firebase from '../../utils/firebase';
import database from '../../data/database';

const withAuth = (Component) => (props) => {
  useEffect(() => {
    const currentUser = firebase.auth.currentUser;
    if (currentUser === null) {
      router.push('/login');
    }

    database.addCustomerSubscriptionListener(currentUser.uid, (snapshot) => {
      if (snapshot.empty) {
        router.push('/pricing');
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
