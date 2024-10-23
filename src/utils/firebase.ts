import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { type Analytics, getAnalytics, isSupported } from "firebase/analytics";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || "",
};

const app = getApps().length <= 0 ? initializeApp(clientCredentials) : getApp();

const auth = getAuth(app);
// if (isSignInWithEmailLink(auth, window.location.href)) {
//   // Additional state parameters can also be passed via URL.
//   // This can be used to continue the user's intended action before triggering
//   // the sign-in operation.
//   // Get the email if available. This should be available if the user completes
//   // the flow on the same device where they started it.
//   let email = window.localStorage.getItem("emailForSignIn");
//   if (!email) {
//     // User opened the link on a different device. To prevent session fixation
//     // attacks, ask the user to provide the associated email again. For example:
//     email = window.prompt("please provide your email for confirmation");
//   }

//   // The client SDK will parse the code from the link for you.
//   if (email !== null) {
//     signInWithEmailLink(auth, email, window.location.href)
//       .then((result) => {
//       // Clear email from storage.
//         window.localStorage.removeItem("emailForSignIn");
//       // You can access the new user via result.user
//       // Additional user info profile not available via:
//       // result.additionalUserInfo.profile == null
//       // You can check if the user is new or existing:
//       // result.additionalUserInfo.isNewUser
//       })
//       .catch((error) => {
//       // Some error occurred, you can inspect the code: error.code
//       // Common errors could be invalid email and invalid or expired OTPs.
//       });
//   }
// }

const functions = getFunctions(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
let analytics: Analytics | null = null;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch((e) => console.warn("analytics is not supported in this environment.", e.message));

export { app, auth, functions, db, storage, analytics };
