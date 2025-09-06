import { UserModel } from "@/domain/types/user_model";
import { useToast } from "../ui/use-toast";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import VenueCard from "../location/VenueCard";
import { getUserById } from "@/data/database";
import UserCluster from "../UserCluster";
import { useAuth } from "@/context/auth";
import { RequestLoginCard } from "../login/RequireLogin";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LocationSideSheet({
  lat,
  lng,
  zoom,
  venues,
  isOpen,
  onOpenChange,
}: {
  lat: number;
  lng: number;
  zoom: number;
  venues: UserModel[];
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const { toast } = useToast();
  const {
    state: { authUser },
  } = useAuth();

  const [performers, setPerformers] = useState<UserModel[]>([]);
  useEffect(() => {
    const getPerformers = async () => {
      const nestedPerfs = await Promise.all(
        venues.map(async (venue) => {
          const topPerformersIds = venue.venueInfo?.topPerformerIds ?? [];
          return (
            await Promise.all(
              topPerformersIds.map(async (performerId) => {
                return await getUserById(performerId);
              }),
            )
          ).filter((performer) => performer !== null) as UserModel[];
        }),
      );

      const perfs = nestedPerfs
        .flat()
        .filter((item, index, self) => index === self.findIndex((obj) => obj.id === item.id));
      setPerformers(perfs);
    };

    getPerformers();
  }, [venues]);

  const genreMap = useMemo(() => {
    if (venues.length === 0) {
      return {};
    }

    const venuesGenres = venues.map((venue) => venue.venueInfo?.genres ?? []);

    // get genre: count map
    return venuesGenres.flat().reduce(
      (acc, genre) => {
        acc[genre] = (acc[genre] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [venues]);

  const GenreChips = useMemo(
    () => (
      <div className="flex flex-wrap gap-1">
        {Object.entries(genreMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .filter(([, count]) => count > 1)
          .map(([genre]) => {
            return (
              <Button key={genre} variant="outline">
                {genre}
              </Button>
            );
          })}
      </div>
    ),
    [genreMap],
  );

  const smallVenues = useMemo(() => {
    if (venues.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row items-start justify-start space-x-5 overflow-x-auto ">
        {venues
          .filter((venue) => venue.venueInfo?.capacity && (venue.venueInfo?.capacity ?? 0) < 250)
          .map((p) => (
            <VenueCard key={p.id} venue={p} />
          ))}
      </div>
    );
  }, [venues]);

  const mediumVenues = useMemo(() => {
    if (venues.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row items-start justify-start space-x-5 overflow-x-auto ">
        {venues
          .filter((venue) => (venue.venueInfo?.capacity ?? 0) >= 250 && (venue.venueInfo?.capacity ?? 0) < 750)
          .map((p) => (
            <VenueCard key={p.id} venue={p} />
          ))}
      </div>
    );
  }, [venues]);

  const largeVenues = useMemo(() => {
    if (venues.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-row items-start justify-start space-x-5 overflow-x-auto ">
        {venues
          .filter((venue) => (venue.venueInfo?.capacity ?? 0) >= 750)
          .map((p) => (
            <VenueCard key={p.id} venue={p} />
          ))}
      </div>
    );
  }, [venues]);

  const performersGroupedByCategory = useMemo(() => {
    if (performers.length === 0) {
      return null;
    }

    const grouped = performers.reduce(
      (acc, performer) => {
        const category = performer.performerInfo?.category ?? "undiscovered";

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(performer);
        return acc;
      },
      {} as Record<string, UserModel[]>,
    );

    const undiscovered = grouped["undiscovered"] ?? [];
    const emerging = grouped["emerging"] ?? [];
    const hometownHero = grouped["hometownHero"] ?? [];
    const mainstream = grouped["mainstream"] ?? [];
    const legendary = grouped["legendary"] ?? [];

    return (
      <>
        {undiscovered.length > 0 && (
          <div className="py-6">
            <h3 className="text-lg font-bold lg:text-2xl">undiscovered performers</h3>
            <UserCluster users={undiscovered} />
          </div>
        )}
        {emerging.length > 0 && (
          <div className="py-6">
            <h3 className="text-lg font-bold lg:text-2xl">emerging performers</h3>
            <UserCluster users={emerging} />
          </div>
        )}
        {hometownHero.length > 0 && (
          <div className="py-6">
            <h3 className="text-lg font-bold lg:text-2xl">hometown hero performers</h3>
            <UserCluster users={hometownHero} />
          </div>
        )}
        {mainstream.length > 0 && (
          <div className="py-6">
            <h3 className="text-lg font-bold lg:text-2xl">mainstream performers</h3>
            <UserCluster users={mainstream} />
          </div>
        )}
        {legendary.length > 0 && (
          <div className="py-6">
            <h3 className="text-lg font-bold lg:text-2xl">legendary performers</h3>
            <UserCluster users={legendary} />
          </div>
        )}
      </>
    );
  }, [performers]);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className={cn(authUser === null ? "" : "overflow-y-scroll")} side="left">
          {authUser === null && (
            <>
              <div className="relative z-40">
                <div className="absolute flex min-h-screen w-full flex-col items-center justify-center bg-transparent">
                  <h1 className="text-center text-2xl font-bold">
                    sign up to get in-depth info about live music in an area as well as stats on &gt;100k
                    venues+performers
                  </h1>
                  <Link href={`/signup?return_url=/map?lat=${lat}&lng=${lng}&zoom=${zoom}`}>
                    <Button>signup</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
          <div className={cn(authUser === null ? "blur" : "")}>
            <div className="bg-background/10 flex justify-start">
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/map?lat=${lat}&lng=${lng}&zoom=${zoom}`);

                  toast({
                    description: "link copied!",
                  });
                }}
              >
                <div className="flex flex-row justify-center">
                  <p>copy link to location</p>
                  <Copy className="ml-2 h-4 w-4" />
                </div>
              </Button>
            </div>
            <div className="flex justify-center py-4">
              <div className="w-full overflow-y-scroll">
                {GenreChips}
                <h3 className="text-lg font-bold lg:text-2xl">small venues</h3>
                {smallVenues}
                <h3 className="text-lg font-bold lg:text-2xl">medium venues</h3>
                {mediumVenues}
                <h3 className="text-lg font-bold lg:text-2xl">large venues</h3>
                {largeVenues}
                {performersGroupedByCategory}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
