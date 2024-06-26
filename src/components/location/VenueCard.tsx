import { UserModel, profileImage } from "@/domain/types/user_model";
import Image from "next/image";

export default function VenueCard({ venue }: {
    venue: UserModel;
}) {
  const pfp = profileImage(venue);
  return (
    <>
      <div className="flex flex-col items-start">
        <div className="relative w-32 h-24 rounded-lg bg-card">
          <Image
            className="rounded-lg w-24 h-24"
            src={pfp}
            alt={venue.artistName ?? venue.username}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <p
          className="mt-2 text-sm font-semibold">
          {venue.artistName ?? venue.username}
        </p>
      </div>
    </>
  );
}
