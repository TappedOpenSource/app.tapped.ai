
import { onAuthStateChanged } from '@firebase/auth';
import firebase from '../utils/firebase';
import { None, Option, Some } from '@sniptt/monads';

export type Auth = {
    currentUser: Option<{ uid: string }>;
    getCurrentUserId: () => Option<{ uid: string }>;
    startAuthObserver: () => void;
    authStateObserver: (callback: (user: any) => void) => void;
    loginWithCredentials: (credentials: Credentials) => Promise<LoginResult>;
    loginWithGoogle: () => Promise<LoginResult>;
    loginWithApple: () => Promise<LoginResult>;
    logout: () => Promise<void>;
};

export type Credentials = { email: string; password: string };

export type LoginResult = { uid: string; token: string };

const FirebaseAuth: Auth = {
  currentUser: None,
  getCurrentUserId: (): Option<{ uid: string }> => {
    return Some({ uid: firebase.auth.currentUser.uid });
  },
  startAuthObserver: () => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        FirebaseAuth.currentUser = Some({ uid });
      } else {
        // User is signed out
        // ...
        FirebaseAuth.currentUser = None;
      }
    });
  },
  authStateObserver: (callback: (user: any) => void) => {
    onAuthStateChanged(firebase.auth, callback);
  },
  loginWithCredentials: async (credentials: Credentials) => {
    return { uid: '123', token: '123' };
  },
  loginWithGoogle: async () => {
    return { uid: '123', token: '123' };
  },
  loginWithApple: async () => {
    return { uid: '123', token: '123' };
  },
  logout: async () => {
    await firebase.auth.signOut();
  },
};

export default FirebaseAuth;
