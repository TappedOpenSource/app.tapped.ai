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
import { Button } from "../ui/button";

export default function SearchDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchBar = useStore(useSearchToggle, (state) => state);
  const { useSearchData, usePlaceData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);

  const [showPerformers, setShowPerformers] = useState<boolean>(true);
  const [showVenues, setShowVenues] = useState<boolean>(false);
  const [showPlaces, setShowPlaces] = useState<boolean>(false);

  const { data } = useSearchData(debouncedQuery, {
    hitsPerPage: 4,
  });
  const { data: placesData } = usePlaceData(debouncedQuery);
  const performerData = data?.filter((hit) => {
    return !hit.occupations?.includes("venue") && !hit.occupations?.includes("Venue");
  });
  const venueData = data?.filter((hit) => {
    return hit.occupations?.includes("venue") || hit.occupations?.includes("Venue");
  });

  const performerResultsList = useMemo(() => {
    if (!performerData || performerData.length === 0) {
      return (
        <CommandEmpty>no results found.</CommandEmpty>
      );
    }

    return performerData?.map((hit) => {
      return (
        <CommandItem
          key={hit.id}
          onSelect={() => {
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
  }, [performerData, pathname, router]);

  const venueResultsList = useMemo(() => {
    if (!venueData || venueData.length === 0) {
      return (
        <CommandEmpty>no results found.</CommandEmpty>
      );
    }

    return venueData?.map((hit) => {
      return (
        <CommandItem
          key={hit.id}
          onSelect={() => {
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
  }, [venueData, pathname, router]);

  const placesResultsList = useMemo(() => {
    if (!placesData || placesData.length === 0) {
      return (
        <CommandEmpty>no results found.</CommandEmpty>
      );
    }

    return placesData?.map((hit) => {
      return (
        <CommandItem
          key={hit.place_id}
          onSelect={() => {
            searchBar?.setIsOpen();
            router.push(`/location/${hit.place_id}`);
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
          {hit.description}
          {/* </span> */}
        </CommandItem>
      );
    });
  }, [placesData, router, searchBar]);

  return (
    <>
      <CommandDialog open={searchBar?.isOpen} onOpenChange={searchBar?.setIsOpen}>
        <CommandInput
          placeholder="search tapped..."
          onValueChange={(value) => setQuery(value)}
        />
        <CommandList>
          <div className="w-full flex flex-row justify-start gap-4 py-2 px-2">
            <Button
              variant="outline"
            >
                performers
            </Button>
            <Button
              variant="outline"
            >
                  venues
            </Button>
            <Button
              variant="outline"
            >
                  cities
            </Button>
          </div>
          {/* <CommandEmpty>no results found.</CommandEmpty> */}
          { (performerData?.length === 0 && venueData?.length === 0 && placesData?.length === 0) ?
            (
              <CommandEmpty>no results found.</CommandEmpty>
            ) :
            (
              <>
                {(!performerData || performerData.length === 0) ? (
                  null
                ) : (

                  <CommandGroup heading="performers">
                    {performerResultsList}
                  </CommandGroup>
                )}
                {(!venueData || venueData.length === 0) ? (
                  null
                ) : (
                  <CommandGroup heading="venues">
                    {venueResultsList}
                  </CommandGroup>
                )}
                {(!placesData || placesData.length === 0) ? (
                  null
                ) : (
                  <CommandGroup heading="cities">
                    {placesResultsList}
                  </CommandGroup>
                )}
              </>
            )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
