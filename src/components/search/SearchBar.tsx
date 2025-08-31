"use client";

import { type UserModel } from "@/domain/types/user_model";
import { Suspense, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useDebounce } from "@/context/debounce";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingSpinner } from "../LoadingSpinner";
import { useStore } from "@/context/use-store";
import { useSearchToggle } from "@/context/use-search-toggle";
import SearchDialog from "../admin-panel/search-dialog";
import { Input } from "../ui/input";
import { trackEvent } from "@/utils/tracking";

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
        }
      >
        <QueryClientProvider client={queryClient}>
          <SearchDialog />
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                {(props.openDialog ?? true) ? (
                  <button
                    className="w-full"
                    onClick={() => {
                      trackEvent("search_bar_clicked", {
                        open: searchBar?.isOpen,
                      });
                      searchBar?.setIsOpen();
                    }}
                  >
                    <_SearchBar {...props} />
                  </button>
                ) : (
                  <_SearchBar {...props} />
                )}
              </TooltipTrigger>
              <TooltipContent side="bottom">search</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </QueryClientProvider>
      </Suspense>
    </>
  );
}

function _SearchBar({
  animatedPlaceholder = false,
}: {
  animatedPlaceholder?: boolean;
}) {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (debouncedQuery === "") return;
    trackEvent("search", { query: debouncedQuery });
  }, [debouncedQuery]);

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
  }, [currentIndex, currentPhraseIndex, animatedPlaceholder]);

  return (
    <>
      <Input
        ref={inputRef}
        type="text"
        placeholder={animatedPlaceholder ? currentText : "search tapped..."}
        // className="bg-card w-full rounded-xl p-2.5 px-3 py-2 ps-10 shadow-xl"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
}
