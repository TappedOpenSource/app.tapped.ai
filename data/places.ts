import { functions } from '@/utils/firebase';
import { httpsCallable } from 'firebase/functions';

export async function getPlaceById(placeId: string) {
  const callable = httpsCallable(functions, 'getPlaceById');

  const results = await callable({
    'placeId': placeId,
  });
  return results.data;
}
