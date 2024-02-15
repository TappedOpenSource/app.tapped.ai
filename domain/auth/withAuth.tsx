import React, { useEffect } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// eslint-disable-next-line react/display-name
const withAuth = (Component) => (props: JSX.IntrinsicAttributes) => {
  const pathname = usePathname();
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        redirect(`/login?returnUrl=${pathname}`);
      }
    });
  }, [pathname]);

  return (
    <>
      <Component {...props} />
    </>
  );
};

export default withAuth;
