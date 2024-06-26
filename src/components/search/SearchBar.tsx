"use client";

import { type UserModel } from "@/domain/types/user_model";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { useDebounce } from "@/context/debounce";
import { useSearch } from "@/context/search";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Search } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { track } from "@vercel/analytics/react";
import { LoadingSpinner } from "../LoadingSpinner";
import { useStore } from "@/context/use-store";
import { useSearchToggle } from "@/context/use-search-toggle";
import SearchDialog from "../admin-panel/search-dialog";
import { Hit } from "./hit";

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

const queryClient = new QueryClient();
export default function SearchBar(props: {
  animatedPlaceholder?: boolean;
  onSelect?: (user: UserModel) => void;
  openDialog?: boolean;
}) {
  const searchBar = useStore(useSearchToggle, (state) => state);
  useHotkeys("/", (e) => {
    e.preventDefault();
    searchBar?.setIsOpen();
  });
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }>
        <QueryClientProvider client={queryClient}>
          <SearchDialog />
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                {
                  (props.openDialog ?? true) ? (
                    <button
                      className="w-full"
                      onClick={searchBar?.setIsOpen}>
                      <_SearchBar {...props} />
                    </button>
                  ) : (
                    <_SearchBar {...props} />
                  )
                }
              </TooltipTrigger>
              <TooltipContent side="bottom">search</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </QueryClientProvider>
      </Suspense>
    </>
  );
}

function _SearchBar({ animatedPlaceholder = false, onSelect }: {
  animatedPlaceholder?: boolean;
  onSelect?: (user: UserModel) => void;
}) {
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (debouncedQuery === "") return;
    track("search", { query: debouncedQuery });
  }, [debouncedQuery]);

  const { data } = useSearchData(debouncedQuery, { hitsPerPage: 5 });
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!animatedPlaceholder) return;

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
            onClick={() => {
              if (onSelect) {
                setQuery("");
                onSelect(user);
                return;
              }

              router.push(`${pathname}?${createQueryString("username", user.username)}`);
            }}
          />
        );
      }),
    [data, router, pathname, createQueryString, onSelect]
  );
  return (
    <>
      <div className="bg-card z-40 rounded-xl border border-input ring-offset-background">
        <div className="relative">
          <div className="pointer-events-none w-4 h-4 absolute top-1/2 transform -translate-y-1/2 left-3">
            <Search className="pointer-events-none h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={animatedPlaceholder ? currentText : "search tapped..."}
            className="bg-card w-full rounded-xl p-2.5 px-6 py-4 ps-10 shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="relative z-50">
          <div className="absolute z-50 w-full flex flex-col">{userTiles}</div>
        </div>
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
