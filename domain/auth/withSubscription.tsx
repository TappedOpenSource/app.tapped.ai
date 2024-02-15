import React, { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { addCustomerSubscriptionListener } from '@/data/database';
import { auth as fAuth } from '@/utils/firebase';
import auth from '@/data/auth';
import { onAuthStateChanged } from '@firebase/auth';

// eslint-disable-next-line react/display-name, sonarjs/cognitive-complexity
const withSubscription = (Component) => (props: JSX.IntrinsicAttributes) => {
  const pathname = usePathname();
  useEffect(() => {
    onAuthStateChanged(fAuth, (authUser) => {
      if (!authUser) {
        redirect('/login');
      }
      auth.getCustomClaims().then((claims) => {
        if (claims === undefined || claims === null) {
          redirect(`/login?returnUrl=${pathname}`);
          return;
        }

        const claim = claims['stripeRole'] as string | null;

        console.log('Tapped Subscription', claim);
        if (claim === null) {
          redirect('/pricing');
        }
      });

      addCustomerSubscriptionListener(authUser?.uid, (snapshot) => {
        if (snapshot.empty) {
          redirect('/pricing');
        }
      });
    });
  }, [pathname]);

  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withSubscription;
