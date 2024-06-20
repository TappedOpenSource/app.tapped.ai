"use client";

import React, { useEffect, useState } from "react";
import { getOpportunityById, getUserById } from "@/data/database";
import { Opportunity, opImage } from "@/domain/types/opportunity";
import Image from "next/image";
import UserTile from "@/components/UserTile";
import { UserModel } from "@/domain/types/user_model";
import { getPlaceById } from "@/data/places";
import { LoadingSpinner } from "../LoadingSpinner";
import ApplyButton from "./ApplyButton";
import { Coins } from "lucide-react";

export default function OpportunityView({
  opportunityId,
}: {
  opportunityId: string;
}) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [booker, setBooker] = useState<UserModel | null>(null);

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
      await getPlaceById(opportunity.placeId);
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

  return (
    <>
      <div className="fixed right-8 bottom-8">
        <ApplyButton op={opportunity} />
      </div>
      <div className="h-4 md:h-12" />
      <div className="flex flex-col lg:flex-row gap-4 lg:justify-center lg:items-start lg:px-12">
        <div className="flex items-center justify-center px-4 md:px-0">
          <div className="relative h-[512px] w-full lg:w-[40vw] lg:aspect-[3/4] overflow-hidden md:px-0">
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
        </div>
        <div className="lg:flex lg:justify-start lg:grow">
          <div className="py-4 px-6">
            <div>
              <h1 className="text-4xl font-extrabold">{opportunity.title}</h1>
            </div>
            <div className="h-4" />
            <div>
              <p className="text-xl">{opportunity.description}</p>
            </div>

            {/* <div className='h-4' />
        <div>
          <h3 className='text-3xl font-bold'>location</h3>
          <div className='h-2' />
          <p className='text-xl'>{opportunity.placeId}</p>
        </div> */}
            <div className="h-4" />
            <div>
              <h3 className="text-3xl font-bold">date</h3>
              <div className="h-2" />
              <p className="text-xl">
                {opportunity.startTime.toLocaleDateString("en-US")}
              </p>
            </div>
            <div className="h-4" />
            {opportunity.isPaid && (
              <>
                <h3 className="text-3xl font-bold">compensation</h3>
                <div className="h-2" />
                <div className="flex flex-row gap-4 items-center">
                  <Coins className="h-4 w-4" />
                  <p>is paid</p>
                </div>
              </>
            )}
            <div className="h-4" />
            <div>
              <h3 className="text-3xl font-bold">listing agent</h3>
              <div className="h-2" />
              {booker && <UserTile user={booker} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
