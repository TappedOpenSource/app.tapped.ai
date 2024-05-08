import { UserModel } from "@/domain/types/user_model";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import StarIcon from "@mui/icons-material/Star";

export default function UserInfoSection({ user }: {
    user: UserModel;
}) {
  const genres = user.performerInfo?.genres ?? user.venueInfo?.genres ?? [];
  const capacity = user.venueInfo?.capacity;
  const rating = user.performerInfo?.rating ?? user.bookerInfo?.rating ?? null;
  const venueType = user.venueInfo?.type;


  return (
    <div className="w-full px-8 py-4 flex flex-col justify-start items-start rounded-xl bg-white/10 shadow-lg">
      <p>@{user.username}</p>
      <div className="w-full h-px bg-gray-200/20 my-1" />
      {venueType && (
        <>
          <div className='flex flex-row'>
            <ApartmentIcon />
            <div className='w-2' />
            <p>{venueType}</p>
          </div>
          <div className="w-full h-px bg-gray-200/20 my-1" />
        </>
      )}
      {capacity && (
        <>
          <div className='flex flex-row'>
            <PeopleAltIcon />
            <div className='w-2' />
            <p>{capacity} capacity</p>
          </div>
          <div className="w-full h-px bg-gray-200/20 my-1" />
        </>
      )}
      {genres && genres.length > 0 && (
        <>
          <div className='flex flex-row'>
            <MusicNoteIcon />
            <div className='w-2' />
            <p className='text-ellipsis overflow-hidden'>{genres.join(", ")}</p>
          </div>
          <div className="w-full h-px bg-gray-200/20 my-1" />
        </>
      )}
      {rating && (
        <div className='flex flex-row'>
          <StarIcon />
          <div className='w-2' />
          <p>{rating} stars</p>
        </div>
      )}
    </div>
  );
}
