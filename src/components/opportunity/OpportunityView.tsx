"use client";

import { getOpportunityById, getUserById } from "@/data/database";
import { getPlaceById } from "@/data/places";
import { Opportunity, opImage } from "@/domain/types/opportunity";
import { PlaceData } from "@/domain/types/place_data";
import { UserModel } from "@/domain/types/user_model";
import { ArrowUpRight, Calendar, Check, Coins, MapPin, Share, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";
import UserChip from "../UserChip";
import EmbededMap from "../profile/EmbededMap";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import ApplyButton from "./ApplyButton";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export default function OpportunityView({
  opportunityId,
  showConfirmation = false,
}: {
  opportunityId: string;
  showConfirmation?: boolean;
}) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [location, setLocation] = useState<PlaceData | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!showConfirmation) return;

    setTimeout(() => {
      toast({
        title: "application submitted!",
        description: "you will be notified if you are selected.",
      });
    }, 1000);
  }, [showConfirmation, toast]);

  useEffect(() => {
    const getOpportunity = async () => {
      if (!opportunityId || typeof opportunityId !== "string") {
        return;
      }

      const opportunity = await getOpportunityById(opportunityId);
      setOpportunity(opportunity ?? null);
    };
    getOpportunity();
  }, [opportunityId]);

  useEffect(() => {
    if (!opportunity) {
      return;
    }

    const getBooker = async () => {
      const booker = await getUserById(opportunity.userId);
      setBooker(booker ?? null);
    };
    getBooker();
  }, [opportunity]);

  useEffect(() => {
    if (!opportunity) {
      return;
    }

    const getLocation = async () => {
      const location = await getPlaceById(opportunity.location.placeId);
      setLocation(location);
    };
    getLocation();
  }, [opportunity]);

  if (!opportunity) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const imageSrc = opImage(opportunity);
  const flierImage = () => (
    <div className="relative h-[512px] w-full overflow-hidden md:aspect-[3/4] md:w-[40vw] md:px-0">
      <Image
        src={imageSrc}
        alt={`${opportunity.title} flier`}
        fill
        className="rounded-md"
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  );

  return (
    <>
      <div className="fixed bottom-8 right-8">
        <ApplyButton op={opportunity} />
      </div>
      <div>
        <div className="flex flex-col gap-4 md:relative md:flex-row md:items-start md:justify-center md:px-12">
          <div className="flex items-start justify-center px-4 md:sticky md:top-0 md:px-0 lg:pt-16">{flierImage()}</div>
          <div className="md:flex md:grow md:justify-start">
            <div className="px-6 py-4">
              <h1 className="text-4xl font-extrabold">{opportunity.title}</h1>
              <div className="h-4" />
              <div className="flex flex-row justify-start gap-4">
                <ApplyButton op={opportunity} />
                {linkCopied ? (
                  <Button
                    variant="secondary"
                    disabled={linkCopied}
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/opportunity/${opportunityId}`);
                      toast({
                        title: "link copied!",
                        description: "share this with another performer",
                      });
                    }}
                  >
                    <Check className="mr-2 h-3 w-3" />
                    <span>link copied!</span>
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    disabled={linkCopied}
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/opportunity/${opportunityId}`);
                      setLinkCopied(true);
                      setTimeout(() => setLinkCopied(false), 5000);
                      toast({
                        title: "link copied!",
                        description: "share this with another performer",
                      });
                    }}
                  >
                    <Share className="mr-2 h-3 w-3" />
                    <span>share with a friend</span>
                  </Button>
                )}
              </div>
              <div className="h-4" />
              <div className="flex flex-row items-center gap-2">
                <Button size={"icon"} variant={"outline"} disabled>
                  <Calendar className="h-6 w-6" />
                </Button>
                <p>
                  {opportunity.startTime
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .toLowerCase()}
                </p>
              </div>
              <div className="h-1" />
              <div className="flex flex-row items-center gap-4">
                <Button size={"icon"} variant={"outline"} disabled>
                  <Coins className="h-6 w-6" />
                </Button>
                <p>{opportunity.isPaid ? "is paid" : "is not paid"}</p>
              </div>
              <div className="h-1" />
              {opportunity.genres && opportunity.genres.length > 0 && (
                <>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div className="flex flex-row items-center gap-4">
                          <Button size={"icon"} variant={"outline"} disabled>
                            <Info className="h-6 w-6" />
                          </Button>
                          {opportunity.genres.length > 3 ? (
                            <span>
                              {opportunity.genres.slice(0, 3).join(", ")} +{opportunity.genres.length - 3}
                            </span>
                          ) : (
                            <span>{opportunity.genres.join(", ")}</span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="start" alignOffset={2}>
                        {opportunity.genres.join(", ")}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
              <div className="h-1" />
              {location && (
                <>
                  <div className="flex flex-row items-center gap-1">
                    <Button size={"icon"} variant={"outline"} disabled>
                      <MapPin className="h-6 w-6" />
                    </Button>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${location.shortFormattedAddress}&query_place_id=${location.placeId}`}
                      referrerPolicy="no-referrer"
                      target="_blank"
                    >
                      <Button variant="link">
                        {location.shortFormattedAddress}
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
              <div className="h-2" />
              <hr />
              <div className="h-2" />
              <div>
                <h3 className="text-md font-bold">booker</h3>
                <div className="h-2" />
                {booker && <UserChip user={booker} />}
                <div className="h-1" />
                <Link href="/download">
                  <Button variant="link" className="flex flex-row items-center gap-1 p-0">
                    <p className="text-foreground/70 text-xs font-bold">contact booker</p>
                    <ArrowUpRight className="text-foreground/70 h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="h-2" />
              <hr />
              <div className="h-2" />
              <div className="py-6">
                <h3 className="text-md font-bold">about event</h3>
                <div className="h-2" />
                <p>{opportunity.description}</p>
              </div>
              <div className="h-2" />
              <hr />
              <div className="h-2" />
              {location && (
                <div>
                  <div>
                    <h3 className="text-md font-bold">location</h3>
                    <p className="text-foreground/70 text-sm">{location.shortFormattedAddress}</p>
                    <div className="h-2" />
                    <EmbededMap lat={opportunity.location.lat} lng={opportunity.location.lng} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
