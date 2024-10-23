"use client";

import { UserModel, profileImage } from "@/domain/types/user_model";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function VenueCard({
  venue,
}: {
  venue: UserModel;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const pfp = profileImage(venue);
  return (
    <>
      <Link href={`${pathname}?${createQueryString("username", venue.username)}`}>
        <div className="flex flex-col items-start rounded-lg group">
          <div className="overflow-hidden relative w-32 h-32 aspect-square rounded-lg bg-card">
            <Image
              className="rounded-lg aspect-square transition-all duration-150 ease-in-out group-hover:scale-105"
              src={pfp}
              alt={venue.artistName ?? venue.username}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <p className="text-sm font-semibold font-bold line-clamp-2 text-ellipsis">
            {venue.artistName ?? venue.username}
          </p>
        </div>
      </Link>
    </>
  );
}
