import {
  // createCheckoutSession,
  getActiveProducts,
} from "@/data/database";
// import * as auth from "@/data/auth";

// export const subscribe = async ({ priceId }: { priceId: string; }): Promise<void> => {
//   const currentUser = auth.getCurrentUserId();
//   if (!currentUser) {
//     return;
//   }

//   await createCheckoutSession({
//     userId: currentUser.uid,
//     priceId: priceId,
//   });
// };

export const getProductAndPriceData = async (): Promise<any[]> => {
  return await getActiveProducts();
};

// export const handleBillingPortal = async (): Promise<string> => {
//   // Call billing portal function
//   const { url } = await api.createPortalLink({ returnUrl: window.location.origin });

//   // window.location.assign(data.url);
//   return url;
// };
