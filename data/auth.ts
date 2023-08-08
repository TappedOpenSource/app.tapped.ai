
import { onAuthStateChanged } from '@firebase/auth';
import firebase from '../utils/firebase';
import { None, Option, Some } from '@sniptt/monads';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export type Auth = {
    currentUser: Option<{ uid: string }>;
    getCurrentUserId: () => Option<{ uid: string }>;
    startAuthObserver: () => void;
    authStateObserver: (callback: (user: any) => void) => void;
    loginWithCredentials: (credentials: Credentials) => Promise<LoginResult>;
    loginWithGoogle: () => Promise<LoginResult>;
    loginWithApple: () => Promise<LoginResult>;
    logout: () => Promise<void>;
    getCustomClaimRole: () => Promise<string | null>;
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
    console.debug('loginWithCredentials', credentials.email);
    await signInWithEmailAndPassword(firebase.auth, credentials.email, credentials.password);
    return { uid: '123', token: '123' };
  },
  loginWithGoogle: async () => {
    console.debug('loginWithGoogle');
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebase.auth, provider);
    return { uid: '123', token: '123' };
  },
  loginWithApple: async () => {
    console.debug('loginWithApple');
    return { uid: '123', token: '123' };
  },
  logout: async () => {
    console.debug('logout');
    await firebase.auth.signOut();
  },
  getCustomClaimRole: async () => {
    await firebase.auth.currentUser?.getIdToken(true);
    const decodedToken = await firebase.auth.currentUser?.getIdTokenResult();
    return decodedToken?.claims['stripeRole'] as string | null;
  },
};

export default FirebaseAuth;
