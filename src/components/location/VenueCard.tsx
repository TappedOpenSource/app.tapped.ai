"use client";

import { UserModel, profileImage } from "@/domain/types/user_model";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function VenueCard({ venue }: {
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
    [searchParams]
  );

  const pfp = profileImage(venue);
  return (
    <>
      <Link
        href={`${pathname}?${createQueryString("username", venue.username)}`}
        className="transition-all duration-150 ease-in-out hover:scale-105"
      >
        <div className="flex flex-col items-start">
          <div className="relative w-32 h-24 rounded-lg bg-card">
            <Image
              className="rounded-lg w-24 h-24"
              src={pfp}
              alt={venue.artistName ?? venue.username}
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <p
            className="text-sm font-semibold font-bold line-clamp-2 text-ellipsis">
            {venue.artistName ?? venue.username}
          </p>
        </div>
      </Link>
    </>
  );
}
