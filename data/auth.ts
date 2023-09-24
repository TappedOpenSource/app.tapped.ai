
import { onAuthStateChanged } from '@firebase/auth';
import firebase from '@/utils/firebase';
import { None, Option, Some } from '@sniptt/monads';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';

export type Auth = {
    currentUser: Option<{ uid: string }>;
    getCurrentUserId: () => Option<{ uid: string }>;
    getCurrentUserEmail: () => Option<{email: string}>;
    startAuthObserver: () => void;
    authStateObserver: (callback: (user: any) => void) => void;
    loginWithCredentials: (credentials: Credentials) => Promise<LoginResult>;
    signupWithCredentials: (credentials: Credentials) => Promise<SignupResult>;
    loginWithGoogle: () => Promise<LoginResult>;
    loginWithApple: () => Promise<LoginResult>;
    logout: () => Promise<void>;
    getCustomClaimRole: () => Promise<string | null>;
};

export type Credentials = { email: string; password: string };

export type LoginResult = { uid: string; token: string };

export type SignupResult = {uid: string; token: string };

const FirebaseAuth: Auth = {
  currentUser: None,
  getCurrentUserId: (): Option<{ uid: string }> => {
    if (firebase.auth.currentUser) {
      return Some({ uid: firebase.auth.currentUser.uid });
    } else {
      return None;
    }
  },
  getCurrentUserEmail: (): Option<{ email: string }> => {
    if (firebase.auth.currentUser) {
      return Some({ email: firebase.auth.currentUser.email });
    } else {
      return None;
    }
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
    const loginResult = await signInWithEmailAndPassword(
      firebase.auth,
      credentials.email,
      credentials.password,
    );
    return { uid: loginResult.user.uid, token: '123' };
  },
  signupWithCredentials: async ({ email, password }: {
    email: string;
    password: string;
  }) => {
    console.debug('signup');
    const loginResult = await createUserWithEmailAndPassword(
      firebase.auth,
      email,
      password,
    );
    return { uid: loginResult.user.uid, token: '123' };
  },
  loginWithGoogle: async () => {
    console.debug('loginWithGoogle');
    const provider = new GoogleAuthProvider();
    const loginResult = await signInWithPopup(firebase.auth, provider);
    return { uid: loginResult.user.uid, token: '123' };
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
