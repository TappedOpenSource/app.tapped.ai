import { UserModel, audienceSize, suggestTicketPriceRange } from "@/domain/types/user_model";
import {
  Castle,
  UsersRound,
  Disc3,
  AtSign,
  Star,
  Tag,
  Ticket,
} from "lucide-react";

export default function UserInfoSection({ user }: { user: UserModel }) {
  const genres = (
    user.performerInfo?.genres ??
    user.venueInfo?.genres ??
    []
  ).map((g) => g.toLowerCase());
  const isPerformer = user.performerInfo !== null && user.performerInfo !== undefined;
  const isVenue = user.venueInfo !== null && user.venueInfo !== undefined;
  const category = user.performerInfo?.category ?? null;
  const capacity = user.venueInfo?.capacity?.toLocaleString() ?? null;
  const rating = user.performerInfo?.rating ?? user.bookerInfo?.rating ?? null;
  const venueType = user.venueInfo?.type?.toLowerCase() ?? null;
  const label = user.performerInfo?.label ?? null;
  const ticketPriceRange = category !== null ? suggestTicketPriceRange(category) : null;

  const audience = audienceSize(user);
  const avgAttendance = (audience / 250).toFixed(0);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="bg-card flex w-full flex-col items-start justify-start rounded-xl px-8 py-4 shadow-lg">
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
            <Disc3 />
            <div className="w-2" />
            <p className="flex-1 overflow-hidden text-ellipsis">{genres.join(", ")}</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>
      )}
      {label && (
        <>
          <div className="flex flex-row">
            <Tag />
            <div className="w-2" />
            <p className="flex-1 overflow-hidden text-ellipsis">{label}</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>

      )}
      {ticketPriceRange && (
        <>
          <div className="flex flex-row">
            <Ticket />
            <div className="w-2" />
            <p>{currencyFormatter.format(ticketPriceRange[0])} - {currencyFormatter.format(ticketPriceRange[1])} avg. ticket price</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>
      )}
      {isPerformer && (
        <>
          <div className="flex flex-row">
            <UsersRound />
            <div className="w-2" />
            <p>{avgAttendance} avg. attendance</p>
          </div>
          <div className="my-1 h-px w-full bg-gray-200/20" />
        </>
      )}
      {rating && (
        <div className="flex flex-row">
          <Star />
          <div className="w-2" />
          <p>{rating} stars</p>
        </div>
      )}
    </div>
  );
}
