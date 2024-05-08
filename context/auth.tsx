
import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Action = {type: "login"; uid: string;} | {type: "logout"}
export type Dispatch = (action: Action) => void
export type State = { uid: string } | null

export const AuthContext = createContext<{
    state: State;
    dispatch: Dispatch;
    } | null
>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
  case "login": {
    return { uid: action.uid };
  }
  case "logout": {
    return null;
  }
  }
}

export function AuthProvider({ children }: {
    children: ReactNode;
 }) {
  const [state, dispatch] = useReducer(authReducer, null);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
