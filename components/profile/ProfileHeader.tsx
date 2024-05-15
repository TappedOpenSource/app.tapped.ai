import InstagramButton from "@/components/profile/InstagramButton";
import SpotifyButton from "@/components/profile/SpotifyButton";
import TiktokButton from "@/components/profile/TiktokButton";
import TwitterButton from "@/components/profile/TwitterButton";
import { Button } from "@/components/ui/button";
import UserInfoSection from "@/components/UserInfoSection";
import {
  audienceSize,
  profileImage,
  reviewCount,
  type UserModel,
} from "@/domain/types/user_model";
import { cn } from "@/lib/utils";
import { Facebook, Link2 } from "lucide-react";
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
    <div className="w-full px-6 py-6 md:px-0 md:py-12">
      <div className="flex flex-row items-center justify-start md:flex-col">
        <div className="flex flex-col items-center justify-center md:aspect-square md:w-full">
          <div className="z-1 relative h-[128px] w-[128px] overflow-hidden rounded-full md:h-full md:w-full md:rounded-xl">
            <Image
              src={imageSrc}
              alt={`${user.artistName} profile picture`}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
        <div className="w-4 md:h-6" />
        <div className="">
          <h1
            className={cn(
              "line-clamp-3 overflow-ellipsis text-4xl font-extrabold md:text-5xl",
              manrope.className
            )}
          >
            {user.artistName ?? user.username}
          </h1>
        </div>
      </div>
      <div className="h-4" />
      {hasReviews && (
        <>
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">
                {firstValue.toLocaleString()}
              </h3>
              <p className="text-font text-xs text-gray-500">{firstLabel}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">{numReviews}</h3>
              <p className="text-font text-xs text-gray-500">reviews</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-2xl font-bold">
                {user.performerInfo?.rating ?
                  `${user.performerInfo?.rating}/5` :
                  "N/A"}
              </h3>
              <p className="text-sm text-gray-400">rating</p>
            </div>
          </div>
          <div className="h-4" />
        </>
      )}
      {user.venueInfo !== null && (
        <div className="flex w-full items-center justify-center">
          <Link
            href={`/request_to_perform?venue_ids=${user.id}`}
            className="w-full"
          >
            <Button className="w-full font-bold">request to perform</Button>
          </Link>
        </div>
      )}
      <div className="h-4" />
      <UserInfoSection user={user} />
      <div className="h-4" />
      <div className="flex flex-row items-center justify-around">
        {user.socialFollowing?.instagramHandle && (
          <InstagramButton
            instagramHandle={user.socialFollowing.instagramHandle}
          />
        )}
        {user.socialFollowing?.twitterHandle && (
          <TwitterButton twitterHandle={user.socialFollowing.twitterHandle} />
        )}
        {user.socialFollowing?.facebookHandle && (
          <Link
            href={`https://facebook.com/${user.socialFollowing.facebookHandle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"outline"} size={"icon"}>
              <Facebook />
            </Button>
          </Link>
        )}
        {user.socialFollowing?.tiktokHandle && (
          <TiktokButton tiktokHandle={user.socialFollowing.tiktokHandle} />
        )}
        {user.performerInfo?.spotifyId && (
          <SpotifyButton spotifyId={user.performerInfo.spotifyId} />
        )}
        {user.venueInfo?.websiteUrl && (
          <Link
            href={user.venueInfo.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"outline"} size={"icon"}>
              <Link2 />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
