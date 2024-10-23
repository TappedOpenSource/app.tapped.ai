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
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserCheck, X, Map } from "lucide-react";
import { Button } from "../ui/button";

export default function SearchDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchBar = useStore(useSearchToggle, (state) => state);
  const { useSearchData, useCityData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);

  const [showPerformers, setShowPerformers] = useState<boolean>(true);
  const [showVenues, setShowVenues] = useState<boolean>(true);
  const [showCities, setShowCities] = useState<boolean>(true);

  const { data } = useSearchData(debouncedQuery, {
    hitsPerPage: 4,
  });
  const { data: placesData } = useCityData(debouncedQuery);
  const performerData = useMemo(() => {
    return (data ?? []).filter((hit) => {
      return !hit.occupations?.includes("venue") && !hit.occupations?.includes("Venue");
    });
  }, [data]);
  const venueData = useMemo(
    () =>
      (data ?? []).filter((hit) => {
        return hit.occupations?.includes("venue") || hit.occupations?.includes("Venue");
      }),
    [data],
  );

  const PerformerResultsList = useMemo(() => {
    if (performerData.length === 0 || !showPerformers) {
      return null;
    }

    return (
      <CommandGroup heading="performers">
        {performerData.map((hit) => (
          <CommandItem
            key={hit.id}
            onSelect={() => {
              router.push(`${pathname}?username=${hit.username}`);
            }}
          >
            {/* <Avatar className="h-4 w-4">
              {hit.profilePicture !== null && (
                <AvatarImage
                  src={hit.profilePicture}
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  className="h-4 w-4"
                />
              )}
              <AvatarFallback>
                <UserCheck className="h-2 w-2" />
              </AvatarFallback>
            </Avatar>
            <span className="ml-2"> */}
            {hit.artistName ?? hit.username}
            {/* </span> */}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  }, [performerData, pathname, router, showPerformers]);

  const venueResultsList = useMemo(() => {
    if (venueData.length === 0 || !showVenues) {
      return null;
    }

    return (
      <CommandGroup heading="venues">
        {venueData.map((hit) => (
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
            </Avatar>

            <span className="ml-2"> */}
            {hit.artistName ?? hit.username}
            {/* </span> */}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  }, [venueData, pathname, router, showVenues]);

  const PlacesResultsList = useMemo(() => {
    if (!placesData || placesData.length === 0 || !showCities) {
      return null;
    }

    return (
      <CommandGroup heading="cities">
        {placesData?.map((hit) => (
          <CommandItem
            key={hit.place_id}
            onSelect={() => {
              searchBar?.setIsOpen();
              router.push(`/location/${hit.place_id}`);
            }}
          >
            {/* <Map className="h-2 w-2 mr-2" /> */}
            {hit.description}
          </CommandItem>
        ))}
      </CommandGroup>
    );
  }, [placesData, router, searchBar, showCities]);

  return (
    <>
      <CommandDialog open={searchBar?.isOpen} onOpenChange={searchBar?.setIsOpen}>
        <CommandInput placeholder="search tapped..." onValueChange={(value) => setQuery(value)} />
        <CommandList>
          <div className="flex w-full flex-row justify-start gap-4 px-2 py-2">
            <Button onClick={() => setShowPerformers(!showPerformers)} variant="outline">
              {showPerformers && <X className="mr-2 h-4 w-4" />}
              performers
            </Button>
            <Button onClick={() => setShowVenues(!showVenues)} variant="outline">
              {showVenues && <X className="mr-2 h-4 w-4" />}
              venues
            </Button>
            <Button onClick={() => setShowCities(!showCities)} variant="outline">
              {showCities && <X className="mr-2 h-4 w-4" />}
              cities
            </Button>
          </div>
          <CommandEmpty>no results found.</CommandEmpty>
          {PerformerResultsList}
          {venueResultsList}
          {PlacesResultsList}
        </CommandList>
      </CommandDialog>
    </>
  );
}
