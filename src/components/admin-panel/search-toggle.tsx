"use client";

import { useSearchToggle } from "@/context/use-search-toggle";
import { useStore } from "@/context/use-store";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function SearchToggle() {
  const searchBar = useStore(useSearchToggle, (state) => state);

  return (
    <>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full w-8 h-8 bg-background"
              variant="outline"
              size="icon"
              onClick={searchBar?.setIsOpen}
            >
              <SearchIcon className="w-[1.2rem] h-[1.2rem]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">search</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
