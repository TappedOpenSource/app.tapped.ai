
import InstagramButton from "@/components/profile/InstagramButton";
import SpotifyButton from "@/components/profile/SpotifyButton";
import TiktokButton from "@/components/profile/TiktokButton";
import TwitterButton from "@/components/profile/TwitterButton";
import UserInfoSection from "@/components/UserInfoSection";
import {
  audienceSize,
  profileImage,
  reviewCount,
  type UserModel,
} from "@/domain/types/user_model";
import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function ProfileHeader({ user }: { user: UserModel }) {
  const imageSrc = profileImage(user);
  const audience = audienceSize(user);
  const firstValue = user.venueInfo?.capacity ?? audience;
  const firstLabel = user.venueInfo?.capacity ? "capacity" : "audience";

  const numReviews = reviewCount(user);
  const hasReviews = numReviews > 0;

  return (
    <div className='py-6 md:py-12 px-6 w-full'>
      <div className='flex flex-row md:flex-col justify-start items-center'>
        <div className='z-1 relative w-[128px] h-[128px] md:h-[256px] md:w-[256px] overflow-hidden rounded-full'>
          <Image
            src={imageSrc}
            alt={`${user.artistName} profile picture`}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }} />
        </div>
        <div className="w-4 md:h-6" />
        <div className=''>
          <h1
            className={cn("text-4xl md:text-4xl font-extrabold", manrope.className)}
          >{user.artistName ?? user.username}</h1>
        </div>
      </div>
      <div className='h-4' />
      {hasReviews && (
        <>
          <div className='flex flex-row items-center justify-around'>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{firstValue.toLocaleString()}</h3>
              <p className='text-xs text-font text-gray-500'>{firstLabel}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{numReviews}</h3>
              <p className='text-xs text-font text-gray-500'>reviews</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h3 className='text-2xl font-bold'>{user.performerInfo?.rating ? `${user.performerInfo?.rating}/5` : "N/A"}</h3>
              <p className='text-sm text-gray-400'>rating</p>
            </div>
          </div>
          <div className='h-4' />
        </>
      )}
      {user.venueInfo !== null && (

        <div className='flex justify-center items-center w-full'>
          <Link
            href='/download'
            className='w-full rounded-full bg-blue-500 px-4 py-2 text-center text-white font-bold cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out'
          >
            request to perform
          </Link>
        </div>
      )}
      <div className='h-4' />
      <UserInfoSection user={user} />
      <div className='h-4' />
      <div className='flex flex-row items-center justify-around'>
        {user.socialFollowing?.instagramHandle && <InstagramButton instagramHandle={user.socialFollowing.instagramHandle} />}
        {user.socialFollowing?.twitterHandle && <TwitterButton twitterHandle={user.socialFollowing.twitterHandle} />}
        {user.socialFollowing?.tiktokHandle && <TiktokButton tiktokHandle={user.socialFollowing.tiktokHandle} />}
        {user.performerInfo?.spotifyId && <SpotifyButton spotifyId={user.performerInfo.spotifyId} />}
      </div>
    </div>
  );
}
