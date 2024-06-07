import InstagramButton from "@/components/profile/InstagramButton";
import SpotifyButton from "@/components/profile/SpotifyButton";
import TiktokButton from "@/components/profile/TiktokButton";
import TwitterButton from "@/components/profile/TwitterButton";
import { Button } from "@/components/ui/button";
import UserInfoSection from "@/components/UserInfoSection";
import { getBookingCount, isVerified } from "@/data/database";
import {
  userAudienceSize,
  profileImage,
  reviewCount,
  type UserModel,
  performerScore,
} from "@/domain/types/user_model";
import { cn } from "@/lib/utils";
import { BadgeCheck, Facebook, Link2 } from "lucide-react";
import { Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import GaugeComponent from "react-gauge-component";
import { useToast } from "../ui/use-toast";
import { Card } from "../ui/card";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["700", "800"],
});

export default function ProfileHeader({ user }: { user: UserModel }) {
  const imageSrc = profileImage(user);
  const audience = userAudienceSize(user);
  const firstValue = user.venueInfo?.capacity ?? audience;
  const firstLabel = user.venueInfo?.capacity ? "capacity" : "audience";
  const category = user.performerInfo?.category;
  const isPerformer = user.performerInfo !== null && user.performerInfo !== undefined;

  const { toast } = useToast();
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const getIfVerified = async () => {
      const res = await isVerified(user.id);
      setVerified(res);
    };

    getIfVerified();
  }, [user.id]);

  const [bookingCount, setBookingCount] = useState<number | null>(null);
  useEffect(() => {
    const fetchBookingCount = async () => {
      const bookingCount = await getBookingCount(user.id);
      setBookingCount(bookingCount);
    };
    fetchBookingCount();
  }, [user.id]);

  return (
    <div className="w-full px-0 py-6 md:py-12">
      <div className="flex flex-row items-center justify-start flex-col">
        <div className="flex flex-col items-center justify-center aspect-square w-full">
          <div className="z-1 relative h-full w-full overflow-hidden rounded-xl">
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
              "flex-1 line-clamp-3 overflow-ellipsis text-4xl font-extrabold md:text-5xl",
              manrope.className
            )}
          >
            {user.artistName ?? user.username}
            {verified && (
              <span className="inline">
                <TooltipProvider disableHoverableContent>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeCheck />
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" alignOffset={2}>
                verified
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>

            )}
          </h1>
        </div>
      </div>
      <div className="h-4" />
      <div className="flex flex-row items-center justify-around">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold">
            {firstValue.toLocaleString()}
          </h3>
          <p className="text-font text-xs text-gray-500">{firstLabel}</p>
        </div>
        {isPerformer ? (
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">{bookingCount}</h3>
            <p className="text-font text-xs text-gray-500">bookings</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold">
              {reviewCount(user)}
            </h3>
            <p className="text-font text-xs text-gray-500">reviews</p>
          </div>
        )}
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
      {(user.venueInfo !== null && user.venueInfo !== undefined) && (
        <div className="flex w-full items-center justify-center">
          <Link
            href={`/build_a_show/request_to_perform?venue_ids=${user.id}`}
            className="w-full"
          >
            <Button className="w-full font-bold">request to perform</Button>
          </Link>
        </div>
      )}
      <div className="h-4" />
      <UserInfoSection user={user} />
      {category && (
        <>
          <div className="h-4" />
          <Button
            className="flex w-full justify-center items-center"
            onClick={() => {
              toast({
                title: `${category} performer`,
                description: "performers are ranked based on how big their shows are, how frequent they are, and how they're selling tickets",
              });
            }}
          >
            <Card>
              <GaugeComponent
                value={performerScore(category)}
                type="radial"
                labels={{
                  valueLabel: {
                    formatTextValue: () => {
                      return `${category}`;
                    },
                  },
                }}
                arc={{
                  colorArray: ["#9E9E9E", "#40C4FF", "#FF9800", "#9C27B0", "#F44336"],
                  subArcs: [{ limit: 33 }, { limit: 66 }, { limit: 80 }, { limit: 95 }, { limit: 100 }],
                  padding: 0.02,
                  width: 0.3,
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0,
                }}
              />
            </Card>
          </Button>
        </>
      )}
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
