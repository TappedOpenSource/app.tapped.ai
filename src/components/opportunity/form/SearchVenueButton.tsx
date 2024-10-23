import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { useDebounce } from "@/context/debounce";
import { useSearch } from "@/context/search";
import type { UserModel, Location } from "@/domain/types/user_model";

export default function SearchVenueButton({
  onChange,
}: {
  onChange: (
    value: (UserModel & { type: "venue" }) | (Location & { type: "location"; formattedAddress: string }),
  ) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { useSearchData, usePlaceData } = useSearch();
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce<string>(query, 250);

  const { data } = useSearchData(debouncedQuery, {
    hitsPerPage: 5,
  });
  const { data: placesData } = usePlaceData(debouncedQuery);
  const venueData = data?.filter((hit) => {
    return hit.occupations?.includes("venue") || hit.occupations?.includes("Venue");
  });

  const venueResultsList = useMemo(() => {
    if (!venueData || venueData.length === 0) {
      return <CommandEmpty>no results found.</CommandEmpty>;
    }

    return venueData?.map((hit) => {
      return (
        <CommandItem
          key={hit.id}
          onSelect={() => {
            onChange({
              ...hit,
              type: "venue",
            });
          }}
        >
          {hit.artistName ?? hit.username}
        </CommandItem>
      );
    });
  }, [venueData, onChange]);

  const placesResultsList = useMemo(() => {
    if (!placesData || placesData.length === 0) {
      return <CommandEmpty>no results found.</CommandEmpty>;
    }

    return placesData?.map((hit) => {
      return (
        <CommandItem
          key={hit.id}
          onSelect={() => {
            onChange({
              placeId: hit.id,
              lat: hit.latitude,
              lng: hit.longitude,
              formattedAddress: hit.formattedAddress,
              type: "location",
            });
          }}
        >
          {hit.formattedAddress}
        </CommandItem>
      );
    });
  }, [placesData, onChange]);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
        search venues...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="search venues..." onValueChange={(value) => setQuery(value)} />
        <CommandList>
          {venueData?.length === 0 && placesData?.length === 0 ? (
            <CommandEmpty>no results found.</CommandEmpty>
          ) : (
            <>
              {!venueData || venueData.length === 0 ? null : (
                <CommandGroup heading="venues">{venueResultsList}</CommandGroup>
              )}
              {!placesData || placesData.length === 0 ? null : (
                <CommandGroup heading="addresses">{placesResultsList}</CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
