import { contactVenue } from "@/data/database";
import type { UserModel } from "@/domain/types/user_model";
import { functions } from "@/utils/firebase";
import { httpsCallable } from "firebase/functions";

export async function requestToPerform(currentUser: UserModel, venues: UserModel[], note: string) {
  const callable = httpsCallable(functions, "sendEmailOnVenueContacting");
  await Promise.all(
    [
      callable({
        "userId": currentUser.id,
      }),
      ...venues.map(async (venue) => {
        const bookingEmail = venue.venueInfo?.bookingEmail;

        if (!bookingEmail) {
          return;
        }

        return contactVenue({
          currentUser,
          venue,
          note,
          bookingEmail,
          // collaborators: _collaborators,
        });
      }),
    ],
  );
}
