"use client";

import React, { useEffect, useState } from "react";
import { getOpportunityById, getUserById } from "@/data/database";
import { Opportunity, opImage } from "@/domain/types/opportunity";
import Image from "next/image";
import { UserModel } from "@/domain/types/user_model";
import { getPlaceById } from "@/data/places";
import { LoadingSpinner } from "../LoadingSpinner";
import ApplyButton from "./ApplyButton";
import { ArrowUpRight, Calendar, Coins } from "lucide-react";
import UserChip from "../UserChip";
import EmbededMap from "../profile/EmbededMap";
import { PlaceData } from "@/domain/types/place_data";
import { Button } from "../ui/button";
import Link from "next/link";

export default function OpportunityView({
  opportunityId,
}: {
  opportunityId: string;
}) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [booker, setBooker] = useState<UserModel | null>(null);
  const [location, setLocation] = useState<PlaceData | null>(null);

  console.log({ opportunity });

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
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const imageSrc = opImage(opportunity);
  const flierImage = () => <div className="relative h-[512px] w-full md:w-[40vw] md:aspect-[3/4] overflow-hidden md:px-0">
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
  </div>;

  return (
    <>
      <div className="fixed right-8 bottom-8">
        <ApplyButton op={opportunity} />
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-center md:items-start md:px-12 md:relative">
          <div className="flex items-start justify-center pt-4 lg:pt-16 px-4 md:px-0 md:sticky md:top-0">
            <div className="md:sticky md:top-0">
              {flierImage()}
            </div>
          </div>
          <div className="md:flex md:justify-start md:grow">
            <div className="py-4 px-6">
              <h1 className="text-4xl font-extrabold">{opportunity.title}</h1>
              <div className="h-4" />
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/opportunity/${opportunityId}`
                    );
                  }}
                >
                  add to calendar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/opportunity/${opportunityId}`
                    );
                  }}
                >
                  share with friend
                </Button>
              </div>
              <div className="h-4" />
              <div className="flex flex-row gap-2 items-center">
                <Button size={"icon"} variant={"outline"} disabled>
                  <Calendar className="h-6 w-6" />
                </Button>
                <p>
                  {opportunity.startTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="h-1" />
              {opportunity.isPaid && (
                <>
                  <div className="flex flex-row gap-4 items-center">
                    <Button size={"icon"} variant={"outline"} disabled>
                      <Coins className="h-6 w-6" />
                    </Button>
                    <p>is paid</p>
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
                    <p className="text-xs font-bold text-foreground/70">contact booker</p>
                    <ArrowUpRight className="h-3 w-3 text-foreground/70" />
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
                    <p className="text-sm text-foreground/70">{location.shortFormattedAddress}</p>
                    <div className="h-2" />
                    <EmbededMap
                      lat={opportunity.location.lat}
                      lng={opportunity.location.lng} />
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
