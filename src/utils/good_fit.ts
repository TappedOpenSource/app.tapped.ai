import { type UserModel, suggestMaxCapacity } from "@/domain/types/user_model";

type Params = {
  user: UserModel;
  venue: UserModel;
};
type Return = boolean;
const cache = new Map<string, number>();

export function isVenueGoodFit({ user, venue }: Params): Return {
  const key = `${user.username}-${venue.username}`;
  if (cache.has(key)) {
    return cache.get(key) === 1;
  }

  const category = user.performerInfo?.category;
  const userGenres = user.performerInfo?.genres ?? [];
  const venueCapacity = venue.venueInfo?.capacity;
  const goodCapFit = category && venueCapacity ? suggestMaxCapacity(category) >= venueCapacity : false;

  const venueGenres = venue.venueInfo?.genres ?? [];

  const genreFit = venueGenres.some((g) => userGenres.includes(g));

  cache.set(key, goodCapFit && genreFit ? 1 : 0);

  return goodCapFit && genreFit;
}
