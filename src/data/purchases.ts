import { Purchases } from "@revenuecat/purchases-js";

export const revenueCatApiKey = process.env["NEXT_PUBLIC_REVENUECAT_BILLING_API_KEY"];
export async function getCustomerInfo(customerId: string) {
  try {
    if (revenueCatApiKey === undefined) {
      throw new Error("RevenueCat API key is not set");
    }

    const purchases = Purchases.configure(revenueCatApiKey, customerId);

    return purchases.getCustomerInfo();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
