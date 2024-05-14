"use client";

import { useAuth } from "@/context/auth";
import { useDebounce } from "@/context/debounce";
import { usePurchases } from "@/context/purchases";
import { useSearch } from "@/context/search";
import { logout } from "@/data/auth";
import {
  audienceSize,
  profileImage,
  type UserModel,
} from "@/domain/types/user_model";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Download,
  Gem,
  LogOut,
  Map,
  MessageCircle,
  Moon,
  Search,
  Sun,
  UserCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const queryClient = new QueryClient();

function getSubtitle(hit: UserModel): string {
  const capacity = hit.venueInfo?.capacity ?? null;
  const totalFollowing = audienceSize(hit);
  const category = hit.performerInfo?.category ?? null;

  if (capacity === null && category === null) {
    return totalFollowing === 0 ?
      `@${hit.username}` :
      `${totalFollowing} followers`;
  }

  if (capacity === null && category !== null) {
    return `${category} performer`;
  }

  if (capacity === null) {
    return `@${hit.username}`;
  }

  return `${capacity} capacity venue`;
}

function Hit({ hit, onClick }: { hit: UserModel; onClick: () => void }) {
  const imageSrc = profileImage(hit);
  const subtitle = getSubtitle(hit);

  return (
    <button onClick={onClick}>
      <div className="w-screen px-4 py-px md:px-8">
        <div className="bg-card my-1 flex w-full flex-row items-center justify-start rounded-full px-4 py-3 transition-all duration-150 ease-in-out hover:scale-105 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <div className="pl-1 pr-2">
            <div className="relative h-[42px] w-[42px]">
              <Image
                src={imageSrc}
                alt="user profile picture"
                fill
                className="rounded-full"
                style={{ objectFit: "cover", overflow: "hidden" }}
              />
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-center overflow-hidden">
            <h1 className="line-clamp-1 overflow-hidden text-ellipsis text-start text-xl font-bold">
              {(hit.artistName ?? hit.username)?.trim()}
            </h1>
            <p className="line-clamp-1 overflow-hidden text-ellipsis text-start text-sm text-gray-400">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}

function MapHeaderUi() {
  const { state } = useAuth();
  const { state: subscribed } = usePurchases();
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();

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
    [data, router]
  );

  return (
    <>
      <div className="peer flex w-screen flex-row items-center px-4 pb-1 pt-8 md:px-8">
        <div className="flex-1">
          <div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="search tapped..."
                className="bg-card w-full rounded-full p-2.5 px-6 py-4 ps-10 shadow-xl md:w-1/2 lg:w-1/3 xl:w-1/4"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="hidden md:block">
            <Link href="/download">
              <Button variant="link">get the app</Button>
            </Link>
          </div>
          {state === null ? (
            <>
              <Link href={`/login?return_url=${encodeURIComponent(pathname)}`}>
                <Button className="ml-2">login</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-background ml-2 hover:cursor-pointer hover:shadow-xl">
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
              <DropdownMenuContent className="bg-background w-48 rounded-xl border-0 p-2 shadow-xl">
                <DropdownMenuLabel>my account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/map"}>
                  <DropdownMenuItem>
                    <Map className="mr-2 h-4 w-4" />
                    <span>map</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute mr-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span>toggle theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        system
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <Link href={"/messages"}>
                    <span>messages</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Gem className="mr-2 h-4 w-4" />
                  {subscribed ? (
                    <span>subscribed</span>
                  ) : (
                    <Link href={"/subscribe"}>
                      <span>subscribe</span>
                    </Link>
                  )}
                </DropdownMenuItem>
                <Link href={"/download"}>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>get app</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>log out</span>
                  {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {/* <div className="hidden items-center justify-center pt-4 ease-in-out peer-has-[:focus-within]:flex">
        <Button
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          onClick={() => router.push("/mass-outreach")}
        >
          mass outreach
        </Button>
      </div> */}
      <div className="flex flex-col">{userTiles}</div>
    </>
  );
}

export default function MapHeader() {
  return (
    <QueryClientProvider client={queryClient}>
      <MapHeaderUi />
    </QueryClientProvider>
  );
}
