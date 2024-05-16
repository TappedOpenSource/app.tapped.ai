import { UserModel } from "@/domain/types/user_model";
import { Castle, UsersRound, Music4, AtSign, Star } from "lucide-react";

export default function UserInfoSection({ user }: { user: UserModel }) {
  const genres = (
    user.performerInfo?.genres ??
    user.venueInfo?.genres ??
    []
  ).map((g) => g.toLowerCase());
  const capacity = user.venueInfo?.capacity;
  const rating = user.performerInfo?.rating ?? user.bookerInfo?.rating ?? null;
  const venueType = user.venueInfo?.type;

  return (
    <div className="bg-secondary flex w-full flex-col items-start justify-start rounded-xl px-8 py-4 shadow-lg">
      <div className="flex w-full flex-row">
        <AtSign />
        <div className="w-2" />
        <p className="line-clamp-1 w-full overflow-hidden text-ellipsis">
          {user.username}
        </p>
      </div>
      <div className="my-1 h-px w-full bg-gray-200/20" />
      {venueType && (
        <>
          <div className="flex flex-row">
            <Castle />
            <div className="w-2" />
            <p>{venueType}</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>
      )}
      {capacity && (
        <>
          <div className="flex flex-row">
            <UsersRound />
            <div className="w-2" />
            <p>{capacity} capacity</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>
      )}
      {genres && genres.length > 0 && (
        <>
          <div className="flex flex-row">
            <Music4 />
            <div className="w-2" />
            <p className="overflow-hidden text-ellipsis">{genres.join(", ")}</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>
      )}
      {rating && (
        <div className="flex flex-row">
          <Star size={21} color="#ffffff" strokeWidth={2.2} absoluteStrokeWidth />
          <div className="w-2" />
          <p>{rating} stars</p>
        </div>
      )}
    </div>
  );
}
