
import { auth } from "@/utils/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";


export type Credentials = { email: string; password: string };

export type LoginResult = { uid: string };

export type SignupResult = {uid: string };

export async function loginWithCredentials(credentials: Credentials) {
  console.debug("loginWithCredentials", credentials.email);
  const loginResult = await signInWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password,
  );
  return { uid: loginResult.user.uid };
}

export async function signupWithCredentials({ email, password }: {
    email: string;
    password: string;
  }) {
  console.debug("signup");
  const loginResult = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return { uid: loginResult.user.uid };
}

export async function loginWithGoogle() {
  console.debug("loginWithGoogle");
  const provider = new GoogleAuthProvider();
  const userCred = await signInWithPopup(auth, provider);
  return { uid: userCred.user.uid, email: userCred.user.email };
}

export async function logout() {
  console.debug("logout");
  await auth.signOut();
}

export async function getCustomClaims() {
  console.log({ currentUser: auth.currentUser });
  const token = await auth.currentUser?.getIdToken(true);
  console.log({ token });
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  console.log({ claims: decodedToken?.claims });
  return decodedToken?.claims ?? null;
}
