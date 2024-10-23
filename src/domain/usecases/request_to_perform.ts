import type { UserModel } from "@/domain/types/user_model";
import { functions } from "@/utils/firebase";
import { httpsCallable } from "firebase/functions";

export async function requestToPerform(currentUser: UserModel, venues: UserModel[], note: string) {
  const callable = httpsCallable(functions, "genericContactVenues");
  await callable({
    userId: currentUser.id,
    venueIds: venues.map((v) => v.id),
    note: note,
    collaborators: [],
  });
}
