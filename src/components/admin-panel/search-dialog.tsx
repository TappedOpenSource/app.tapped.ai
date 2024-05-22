"use client";

import { useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/context/debounce";
import { useSearch } from "@/context/search";
import { useSearchToggle } from "@/context/use-search-toggle";
import { useStore } from "@/context/use-store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserCheck } from "lucide-react";

export default function SearchDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchBar = useStore(useSearchToggle, (state) => state);
  const { useSearchData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const { data } = useSearchData(debouncedQuery, { hitsPerPage: 7 });

  const resultsList = useMemo(() => {
    if (!data || data.length === 0) {
      return (
        <CommandEmpty>no results found.</CommandEmpty>
      );
    }

    return data?.map((hit) => {
      return (
        <CommandItem
          key={hit.id}
          onSelect={() => {
            console.log("help");
            router.push(`${pathname}?username=${hit.username}`);
          }}
        >
          {/* <Avatar>
            {hit?.profilePicture !== null && (
              <AvatarImage
                src={hit?.profilePicture}
                style={{ objectFit: "cover", overflow: "hidden" }}
              />
            )}
            <AvatarFallback>
              <UserCheck className="h-4 w-4" />
            </AvatarFallback>
          </Avatar> */}

          {/* <span> */}
          {hit.artistName ?? hit.username}
          {/* </span> */}
        </CommandItem>
      );
    });
  }, [data, pathname, router]);

  return (
    <>
      <CommandDialog open={searchBar?.isOpen} onOpenChange={searchBar?.setIsOpen}>
        <CommandInput
          placeholder="search tapped..."
          onValueChange={(value) => setQuery(value)}
        />
        <CommandList>
          {/* <CommandEmpty>no results found.</CommandEmpty> */}
          <CommandGroup heading="profiles">
            {resultsList}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
