import React, { useEffect } from 'react';
import router from 'next/router';
import database from '@/data/database';
import { auth as fAuth } from '@/utils/firebase';
import auth from '@/data/auth';
import { onAuthStateChanged } from '@firebase/auth';

// eslint-disable-next-line react/display-name, sonarjs/cognitive-complexity
const withSubscription = (Component) => (props: JSX.IntrinsicAttributes) => {
  useEffect(() => {
    onAuthStateChanged(fAuth, (authUser) => {
      if (!authUser) {
        router.push('/login');
      }
      auth.getCustomClaims().then((claims) => {
        if (claims === undefined || claims === null) {
          router.push({
            pathname: '/login',
            query: { returnUrl: router.pathname },
          });
          return;
        }

        const claim = claims['stripeRole'] as string | null;

        console.log('Tapped Subscription', claim);
        if (claim === null) {
          router.push('/pricing');
        }
      });

      database.addCustomerSubscriptionListener(authUser.uid, (snapshot) => {
        if (snapshot.empty) {
          router.push('/pricing');
        }
      });
    });
  }, []);

  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withSubscription;
