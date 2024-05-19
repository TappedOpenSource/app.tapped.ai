
"use client";

import { UserModel } from "@/domain/types/user_model";
import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Action = {type: "ONBOARD"; currentUser: UserModel};
export type Dispatch = (action: Action) => void
export type State = { currentUser: UserModel } | null

export const OnboardContext = createContext<{
    state: State;
    dispatch: Dispatch;
    } | null
>(null);

export function useOnboarded() {
  const context = useContext(OnboardContext);
  if (context === null) {
    throw new Error("useOnboarded must be used within an OnboardProvider");
  }

  return context;
}

function onboardReducer(state: State, action: Action): State {
  const { type } = action;
  if (type === "ONBOARD") {
    return { currentUser: action.currentUser };
  }

  return state;
}

export function OnboardProvider({ children }: {
    children: ReactNode;
 }) {
  const [state, dispatch] = useReducer(onboardReducer, null);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <OnboardContext.Provider value={value}>
      {children}
    </OnboardContext.Provider>
  );
}
