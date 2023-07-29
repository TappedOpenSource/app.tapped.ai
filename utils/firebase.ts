import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
// import {getAnalytics} from "firebase/analytics";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || '',
};
console.debug(JSON.stringify(clientCredentials, null, 2));

const app = getApps().length <= 0 ?
  initializeApp(clientCredentials) :
  getApp();

const auth = getAuth(app);
const functions = getFunctions(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

const JOHANNES_USERID = '8yYVxpQ7cURSzNfBsaBGF7A7kkv2';

export default {
  app,
  auth,
  functions,
  db,
  JOHANNES_USERID,
  // analytics,
};
