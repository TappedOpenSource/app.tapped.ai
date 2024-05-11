"use client";

import { useAuth } from "@/context/auth";
import { useDebounce } from "@/context/debounce";
import { usePurchases } from "@/context/purchases";
import { useSearch } from "@/context/search";
import { logout } from "@/data/auth";
import { audienceSize, profileImage, type UserModel } from "@/domain/types/user_model";
import { Download, Gem, LogOut, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function getSubtitle(hit: UserModel): string {
  const capacity = hit.venueInfo?.capacity ?? null;
  const totalFollowing = audienceSize(hit);
  const category = hit.performerInfo?.category ?? null;

  if (capacity === null && category === null) {
    return totalFollowing === 0 ? `@${hit.username}` : `${totalFollowing} followers`;
  }


  if (capacity === null && category !== null) {
    return `${category} performer`;
  }

  if (capacity === null) {
    return `@${hit.username}`;
  }

  return `${capacity} capacity venue`;
}

function Hit({ hit, onClick }: { hit: UserModel, onClick: () => void}) {
  const imageSrc = profileImage(hit);
  const subtitle = getSubtitle(hit);

  return (
    <button
      onClick={onClick}
    >
      <div className='px-4 md:px-8 py-px w-screen'>
        <div
          className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 flex flex-row items-center justify-start bg-background rounded-full py-3 my-1 hover:scale-105 transition-all duration-150 ease-in-out'
        >
          <div className="pl-1 pr-2">
            <div className='relative w-[42px] h-[42px]'>
              <Image
                src={imageSrc}
                alt="user profile picture"
                fill
                className="rounded-full"
                style={{ objectFit: "cover", overflow: "hidden" }}
              />
            </div>
          </div>
          <div className='flex flex-col justify-center items-start w-full flex-1 overflow-hidden'>
            <h1 className="text-start font-bold text-xl line-clamp-1 text-ellipsis overflow-hidden">{(hit.artistName ?? hit.username)?.trim()}</h1>
            <p className="text-start text-sm text-gray-400 line-clamp-1 text-ellipsis overflow-hidden">{subtitle}</p>
          </div>
        </div>
      </div>
    </button>
  );
}


export default function MapHeader() {
  const { state } = useAuth();
  const { state: subscribed } = usePurchases();
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useSearchData(debouncedQuery, { hitsPerPage: 5 });

  const userTiles = useMemo(
    () =>
      (data ?? []).map((user) => {
        return (
          <Hit
            key={user.id}
            hit={user}
            onClick={() => router.push(`/map?username=${user.username}`)}
          />
        );
      }),
    [data, router],
  );

  return (
    <>
      <div className='flex flex-row items-center px-4 md:px-8 pt-8 pb-1 w-screen'>
        <div className="flex-1">
          <div>
            <input
              type='text'
              placeholder='search tapped...'
              className='bg-background rounded-full shadow-xl py-4 px-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {state === null ? (
          <>
            <Link
              href={`/login?returnUrl=${encodeURIComponent(pathname)}`}
            >
              login
            </Link>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className="ml-2 bg-background hover:cursor-pointer hover:shadow-xl"
              >
                {state.currentUser.profilePicture !== null && (
                  <AvatarImage
                    src={state.currentUser.profilePicture}
                    style={{ objectFit: "cover", overflow: "hidden" }}
                  />
                )}
                <AvatarFallback>
                  <UserCheck className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 bg-background border-0 shadow-xl rounded-xl p-2"
            >
              <DropdownMenuLabel>my account</DropdownMenuLabel>
              <Link
                href={"/download"}
              >
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>get app</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Gem className="mr-2 h-4 w-4" />
                {subscribed ? (
                  <span>subscribed</span>
                ) : (
                  <Link
                    href={"/subscribe"}
                  >
                    <span>subscribe</span>
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>log out</span>
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className='flex flex-col'>
        {userTiles}
      </div>
    </>
  );
}
