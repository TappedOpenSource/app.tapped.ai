"use client";
import posthog from "posthog-js";
import { getUserById } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { auth } from "@/utils/firebase";
import { User } from "firebase/auth";
import { type ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import GoogleOneTap from "@/components/google-one-tap";

export type Action =
  | { type: "ONBOARD"; currentUser: UserModel; authUser?: User }
  | { type: "LOGIN"; authUser: User }
  | { type: "LOGOUT" };
export type Dispatch = (action: Action) => void;
export type State = {
  authUser: User | null;
  currentUser: UserModel | null;
};

export const AuthContext = createContext<{
  state: State;
  dispatch: Dispatch;
} | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function initAuthListener(state: State, dispatch: Dispatch) {
  return auth.onAuthStateChanged(async (user) => {
    const curUid = state?.currentUser?.id;
    const uid = user?.uid;
    if (uid === curUid) {
      return;
    }

    if (!user) {
      posthog.reset();
      dispatch({ type: "LOGOUT" });
      return;
    }

    const currentUser = await getUserById(user.uid);
    if (!currentUser) {
      posthog.identify(uid);

      dispatch({ type: "LOGIN", authUser: user });
      return;
    }

    posthog.identify(uid, {
      email: currentUser.email,
      displayName: currentUser.artistName ?? currentUser.username,
      username: currentUser.username,
    });
    dispatch({ type: "ONBOARD", authUser: user, currentUser: currentUser });
  });
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ONBOARD": {
      if (!state.authUser && !action.authUser) {
        console.error("cannot onboard without an authUser");
        return state;
      }
      return {
        authUser: action.authUser ?? state.authUser,
        currentUser: action.currentUser,
      };
    }
    case "LOGIN": {
      return { authUser: action.authUser, currentUser: null };
    }
    case "LOGOUT": {
      return { authUser: null, currentUser: null };
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    authUser: null,
    currentUser: null,
  });
  useEffect(() => {
    return initAuthListener(state, dispatch);
  }, [state]);

  const value = { state, dispatch };
  return (
    <AuthContext.Provider value={value}>
      {state.authUser === null && <GoogleOneTap />}
      {children}
    </AuthContext.Provider>
  );
}
