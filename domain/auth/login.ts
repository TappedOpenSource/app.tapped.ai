
import * as auth from "@/data/auth";
import type { Dispatch } from "@/context/auth";

export async function continueWithGoogle(dispatch: Dispatch) {
  try {
    const { uid } = await auth.loginWithGoogle();
    dispatch({ type: "login", uid });
  } catch (error) {
    console.error(error);
    throw new Error("failed to login with Google", { cause: error });
  }
}

export async function logout(dispatch: Dispatch) {
  await auth.logout();
  dispatch({ type: "logout" });
}
