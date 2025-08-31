import { auth } from "@/utils/firebase";
import { trackEvent } from "@/utils/tracking";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export type Credentials = { email: string; password: string };

export type LoginResult = { uid: string };

export type SignupResult = { uid: string };

export async function loginWithCredentials(credentials: Credentials) {
  console.debug("loginWithCredentials", credentials.email);
  const loginResult = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  trackEvent("login", { method: "email", email: credentials.email });
  return { uid: loginResult.user.uid };
}

export async function signupWithCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.debug("signup");
  const loginResult = await createUserWithEmailAndPassword(auth, email, password);
  trackEvent("signup", { method: "email", email });
  return { uid: loginResult.user.uid };
}

export async function sendPasswordlessEmail(
  email: string,
  {
    returnUrl,
  }: {
    returnUrl: string;
  },
) {
  const fullReturnUrl = `https://tapped.ai/${returnUrl}`;
  await sendSignInLinkToEmail(auth, email, {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: fullReturnUrl,
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.intheloopstudio",
    },
    android: {
      packageName: "com.intheloopstudio",
      installApp: true,
      minimumVersion: "12",
    },
    dynamicLinkDomain: "tapped.ai",
  });
}

export async function loginWithGoogle() {
  console.debug("loginWithGoogle");
  const provider = new GoogleAuthProvider();
  const userCred = await signInWithPopup(auth, provider);

  trackEvent("login", { method: "google", email: userCred.user.email });
  return { uid: userCred.user.uid, email: userCred.user.email };
}

export async function loginWithToken(token: string) {
  console.debug("loginWithToken");
  const credentials = GoogleAuthProvider.credential(token);
  const userCred = await signInWithCredential(auth, credentials);

  trackEvent("login", { method: "google", email: userCred.user.email });
  return { uid: userCred.user.uid, email: userCred.user.email };
}

export async function logout() {
  trackEvent("logout");
  await auth.signOut();
}

export async function getCustomClaims() {
  // console.log({ currentUser: auth.currentUser });
  // const token = await auth.currentUser?.getIdToken(true);
  // console.log({ token });
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  // console.log({ claims: decodedToken?.claims });
  return decodedToken?.claims ?? null;
}
