"use client";

import { type ReactNode, createContext, useContext, useReducer } from "react";
import { useAuth } from "./auth";
import { initPurchases } from "@/domain/usecases/purchases";

export type State = boolean | null;
export type Action = { type: "SUBSCRIBE" } | { type: "UNSUBSCRIBE" };
export type Dispatch = (action: Action) => void;

export const PurchasesContext = createContext<{
  state: State;
  dispatch: Dispatch;
} | null>(null);

export function usePurchases() {
  const context = useContext(PurchasesContext);
  if (context === null) {
    throw new Error("usePurchases must be used within an PurchasesProvider");
  }

  return context;
}

function purchasesReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUBSCRIBE": {
      return true;
    }
    case "UNSUBSCRIBE": {
      return false;
    }
  }
}

export function PurchasesProvider({ children }: { children: ReactNode }) {
  const {
    state: { authUser },
  } = useAuth();
  const [state, dispatch] = useReducer(purchasesReducer, null);

  if (state === null && authUser !== null) {
    initPurchases(authUser.uid, state, dispatch);
  }

  return <PurchasesContext.Provider value={{ state, dispatch }}>{children}</PurchasesContext.Provider>;
}
