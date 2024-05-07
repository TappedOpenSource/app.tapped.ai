
import type { Option } from '@/domain/types/option';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '@/utils/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, ParsedToken } from 'firebase/auth';

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
    getCustomClaims: () => Promise<ParsedToken | null>;
};

export type Credentials = { email: string; password: string };

export type LoginResult = { uid: string; token: string };

export type SignupResult = {uid: string; token: string };

const FirebaseAuth: Auth = {
  currentUser: null,
  getCurrentUserId: (): Option<{ uid: string }> => {
    if (auth.currentUser) {
      return { uid: auth.currentUser.uid };
    } else {
      return null;
    }
  },
  getCurrentUserEmail: (): Option<{ email: string }> => {
    if (auth.currentUser && auth.currentUser.email) {
      return { email: auth.currentUser.email };
    } else {
      return null;
    }
  },
  startAuthObserver: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        FirebaseAuth.currentUser = { uid };
      } else {
        // User is signed out
        // ...
        FirebaseAuth.currentUser = null;
      }
    });
  },
  authStateObserver: (callback: (user: any) => void) => {
    onAuthStateChanged(auth, callback);
  },
  loginWithCredentials: async (credentials: Credentials) => {
    console.debug('loginWithCredentials', credentials.email);
    const loginResult = await signInWithEmailAndPassword(
      auth,
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
      auth,
      email,
      password,
    );
    return { uid: loginResult.user.uid, token: '123' };
  },
  loginWithGoogle: async () => {
    console.debug('loginWithGoogle');
    const provider = new GoogleAuthProvider();
    const loginResult = await signInWithPopup(auth, provider);
    return { uid: loginResult.user.uid, token: '123' };
  },
  loginWithApple: async () => {
    console.debug('loginWithApple');
    return { uid: '123', token: '123' };
  },
  logout: async () => {
    console.debug('logout');
    await auth.signOut();
  },
  getCustomClaims: async () => {
    console.log({ currentUser: auth.currentUser });
    const token = await auth.currentUser?.getIdToken(true);
    console.log({ token });
    const decodedToken = await auth.currentUser?.getIdTokenResult();
    console.log({ claims: decodedToken?.claims });
    return decodedToken?.claims ?? null;
  },
};

export default FirebaseAuth;
