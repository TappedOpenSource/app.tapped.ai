import database from '@/data/database';
import api from '@/data/api';
import auth from '@/data/auth';

export const subscribe = async ({ priceId }: { priceId: string; }): Promise<void> => {
  await database.createCheckoutSession({
    userId: auth.getCurrentUserId().unwrap().uid,
    priceId: priceId,
  });
};

export const getProductAndPriceData = async (): Promise<any[]> => {
  return await database.getActiveProducts();
};

export const handleBillingPortal = async (): Promise<string> => {
  // Call billing portal function
  const { url } = await api.createPortalLink({ returnUrl: window.location.origin });

  // window.location.assign(data.url);
  return url;
};
