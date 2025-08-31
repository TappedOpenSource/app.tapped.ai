import type { Dispatch } from "@/context/purchases";
import { revenueCatApiKey } from "@/data/purchases";
import { Purchases } from "@revenuecat/purchases-js";

export async function initPurchases(currentUserId: string, state: boolean | null, dispatch: Dispatch) {
  try {
    if (revenueCatApiKey === undefined) {
      throw new Error("RevenueCat API key is not set");
    }

    const purchases = Purchases.configure(revenueCatApiKey, currentUserId);

    const customerInfo = await purchases.getCustomerInfo();

    const isSubscribed = customerInfo.entitlements.active["pro"] !== undefined;
    if (isSubscribed === state) {
      return;
    }

    if (isSubscribed) {
      dispatch({ type: "SUBSCRIBE" });
    } else {
      dispatch({ type: "UNSUBSCRIBE" });
    }
  } catch (e) {
    console.error(e);
    dispatch({ type: "UNSUBSCRIBE" });
  }
}
