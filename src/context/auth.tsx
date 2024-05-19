"use client";

import { getUserById } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { auth } from "@/utils/firebase";
import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Action = {type: "ONBOARD", currentUser: UserModel}
  | {type: "LOGIN"; currentUserId: string }
  | {type: "LOGOUT"}
export type Dispatch = (action: Action) => void
export type State = {
  currentUserId: string | null,
  currentUser: UserModel | null,
 };

export const AuthContext = createContext<{
    state: State;
    dispatch: Dispatch;
    } | null
>(null);

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
      dispatch({ type: "LOGOUT" });
      return;
    }

    const currentUser = await getUserById(user.uid);
    if (!currentUser) {
      dispatch({ type: "LOGIN", currentUserId: user.uid });
      return;
    }

    dispatch({ type: "ONBOARD", currentUser: currentUser });
  });
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
  case "ONBOARD": {
    return { currentUserId: action.currentUser.id, currentUser: action.currentUser };
  }
  case "LOGIN": {
    return { currentUserId: action.currentUserId, currentUser: null };
  }
  case "LOGOUT": {
    return { currentUserId: null, currentUser: null };
  }
  }
}

export function AuthProvider({ children }: {
    children: ReactNode;
 }) {
  const [state, dispatch] = useReducer(authReducer, { currentUserId: null, currentUser: null });
  initAuthListener(state, dispatch);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
