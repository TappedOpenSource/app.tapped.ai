"use client";

import { auth } from "@/utils/firebase";
import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Action = {type: "LOGIN"; uid: string;} | {type: "LOGOUT"}
export type Dispatch = (action: Action) => void
export type State = { uid: string } | null

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
  return auth.onAuthStateChanged((user) => {
    const curUid = state?.uid;
    const uid = user?.uid;
    if (uid === curUid) {
      return;
    }

    if (user) {
      dispatch({ type: "LOGIN", uid: user.uid });
    } else {
      dispatch({ type: "LOGOUT" });
    }
  });
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
  case "LOGIN": {
    return { uid: action.uid };
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
