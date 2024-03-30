import { UserModel } from '@/domain/models/user_model';
import algoliasearch from 'algoliasearch';

export const searchClient = algoliasearch(
  'GCNFAI2WB6',
  'c89ebf37b46a3683405be3ed0901f217',
);

export const usersIndex = searchClient.initIndex('prod_users');

// export type BoundingBox = [number, number, number, number]; //N, W, S, E
export type BoundingBox = {
    readonly sw: { lat: number, lng: number },
    readonly ne: { lat: number, lng: number },
};

export async function queryVenuesInBoundedBox(bounds: BoundingBox | null): Promise<UserModel[]> {
  const response = await usersIndex.search<UserModel>('', {
    filters: 'occupations:Venue OR occupations:venue AND deleted:false',
    insideBoundingBox: bounds === null ?
      undefined :
      [[bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng]],
  });

  return response.hits;
}

export async function queryUsers(query: string, { hitsPerPage }: {
  hitsPerPage: number;
}): Promise<UserModel[]> {
  const response = await usersIndex.search<UserModel>(query, {
    filters: 'deleted:false',
    hitsPerPage: hitsPerPage ?? 10,
  });

  return response.hits;
}
