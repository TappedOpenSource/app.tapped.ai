"use client";

import { getUserById } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { auth } from "@/utils/firebase";
import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Action = {type: "LOGIN"; currentUser: UserModel;} | {type: "LOGOUT"}
export type Dispatch = (action: Action) => void
export type State = { currentUser: UserModel } | null

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
      dispatch({ type: "LOGOUT" });
      return;
    }

    dispatch({ type: "LOGIN", currentUser: currentUser });
  });
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
  case "LOGIN": {
    return { currentUser: action.currentUser };
  }
  case "LOGOUT": {
    return null;
  }
  }
}

export function AuthProvider({ children }: {
    children: ReactNode;
 }) {
  const [state, dispatch] = useReducer(authReducer, null);
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
