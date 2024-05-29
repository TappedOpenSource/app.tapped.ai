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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
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
import { genres } from "@/domain/types/genre";

const queryClient = new QueryClient();

function getSubtitle(hit: UserModel): string {
  const capacity = hit.venueInfo?.capacity ?? null;
  const totalFollowing = audienceSize(hit);
  const category = hit.performerInfo?.category ?? null;

  if (capacity === null && category === null) {
    return totalFollowing === 0 ?
      `@${hit.username}` :
      `${totalFollowing.toLocaleString()} followers`;
  }

  if (capacity === null && category !== null) {
    return `${category} performer`;
  }

  if (capacity === null) {
    return `@${hit.username}`;
  }

  return `${capacity.toLocaleString()} capacity venue`;
}

function Hit({ hit, onClick }: { hit: UserModel; onClick: () => void }) {
  const imageSrc = profileImage(hit);
  const subtitle = getSubtitle(hit);

  return (
    <button onClick={onClick}>
      <div className="py-px">
        <div className="bg-card my-1 flex w-full flex-row items-center justify-start rounded-xl px-4 py-3 transition-all duration-150 ease-in-out hover:scale-105">
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

function GenreList({ genres, selectedGenres, setSelectedGenres }: {
  genres: string[];
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const selectedGenresInFrom = genres.slice(0).sort((a, b) => {
    const aSelected = selectedGenres.includes(a);
    const bSelected = selectedGenres.includes(b);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;

    return 0;
  });

  return (
    <div className="flex flex-row items-center justify-start ease-in-out peer-has-[:focus-within]:flex overflow-x-scroll no-scrollbar">
      {selectedGenresInFrom.map((genre) => (
        <Button
          key={genre}
          variant={selectedGenres.includes(genre) ? "default" : "outline"}
          onClick={() => {
            if (selectedGenres.includes(genre)) {
              setSelectedGenres(selectedGenres.filter((g) => g !== genre));
            } else {
              setSelectedGenres([...selectedGenres, genre]);
            }
          }}
          className="m-1"
        >
          {genre.toLowerCase()}
        </Button>
      ))}
    </div>
  );
}

const phrases = [
  // eslint-disable-next-line sonarjs/no-duplicate-string
  "search tapped...",
  "'Bad Bunny'",
  "'Madison Square Garden'",
  "search tapped...",
  "'Drake'",
  "'Elsewhere Brooklyn'",
  "'Noah Kahan'",
  "search tapped...",
  "'9:30 Club'",
  "'Chandler'",
];

function SearchBar() {
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const { data } = useSearchData(debouncedQuery, { hitsPerPage: 5 });
  useHotkeys("/", (e) => {
    e.preventDefault();
    inputRef.current?.focus();
  });

  const searchParams = useSearchParams();
  const rawSelectedGenres = searchParams.get("genres") ?? "";
  const selectedGenres = (rawSelectedGenres === "") ? [] : rawSelectedGenres.split(",");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setSelectedGenres = (genres: string[]) => {
    const newParams = createQueryString("genres", genres.join(","));
    router.push(`${pathname}?${newParams}`);
  };

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const text = phrases[currentPhraseIndex];
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }

    setTimeout(() => {
      setCurrentPhraseIndex((prevIndex) => {
        if (prevIndex === phrases.length - 1) return 0;
        return prevIndex + 1;
      });
      setCurrentText("");
      setCurrentIndex(0);
    }, 1500);
  }, [currentIndex, currentPhraseIndex]);

  const userTiles = useMemo(
    () =>
      (data ?? []).map((user) => {
        return (
          <Hit
            key={user.id}
            hit={user}
            onClick={() => router.push(`${pathname}?${createQueryString("username", user.username)}`)}
          />
        );
      }),
    [data, router, pathname, createQueryString]
  );
  return (
    <>
      <div className="bg-card rounded-xl md:w-3/4 lg:w-3/4 xl:w-1/2">
        <div className="relative">
          <div className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3">
            <Search className="pointer-events-none h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={currentText}
            className="bg-card w-full rounded-xl p-2.5 px-6 py-4 ps-10 shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col">{userTiles}</div>
      </div>
      {/* <div className="overflow-x-auto">
            <GenreList
              genres={genres}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          </div> */}
    </>
  );
}

function MapHeaderUi() {
  const { state: { currentUser } } = useAuth();
  const { state: subscribed } = usePurchases();
  const { setTheme } = useTheme();
  return (
    <>
      <div className="flex w-screen flex-row items-start px-4 pb-1 pt-8 md:px-8">
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex flex-row gap-3">
          <div className="hidden md:block">
            <Link
              href="https://tapped.ai/download"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <Button variant="link">get the app</Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">top lists</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>top lists</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>top trending</DropdownMenuItem>
                <DropdownMenuItem disabled>top performers</DropdownMenuItem>
                <DropdownMenuItem disabled>top venues</DropdownMenuItem>
                <DropdownMenuItem disabled>top genres</DropdownMenuItem>
                <DropdownMenuItem disabled>top cities</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:block">
            <Button disabled variant="secondary">compare performers</Button>
          </div>
          {currentUser === null ? (
            <>
              <Link href={`/signup?return_url=${encodeURIComponent("/dashboard")}`}>
                <Button className="ml-2">sign up</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="bg-background ml-2 hover:cursor-pointer hover:shadow-xl">
                  {currentUser?.profilePicture !== null && (
                    <AvatarImage
                      src={currentUser?.profilePicture}
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
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>
                    <Map className="mr-2 h-4 w-4" />
                    <span>dashboard</span>
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
