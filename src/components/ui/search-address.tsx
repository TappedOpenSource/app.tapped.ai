"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CommandLoading } from "cmdk";
import { PlacePrediction } from "@/domain/types/place_data";
import { useSearchAddress } from "@/context/search-address";

interface SearchAddressProps {
  onSelectLocation: (item: PlacePrediction | null) => void;
}
const SearchAddress: React.FC<SearchAddressProps> = ({ onSelectLocation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { results, loading, handleSearch, selectedItem, setSelectedItem } = useSearchAddress();

  const resultsList = useMemo(() => {
    return results.map((result, index) => (
      <CommandItem
        key={index}
        value={result.formattedAddress}
        onSelect={(currentValue: string) => {
          setValue(currentValue === value ? "" : currentValue);
          setSelectedItem(result ?? null);
          onSelectLocation(result ?? null);
          setOpen(false);
        }}
      >
        <Check className={cn("mr-2 h-4 w-4", value === result.formattedAddress ? "opacity-100" : "opacity-0")} />
        {result.formattedAddress}
      </CommandItem>
    ));
  }, [results, onSelectLocation, value, setSelectedItem]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between truncate">
          <p className="truncate">{selectedItem ? `${selectedItem.formattedAddress}` : "select city..."}</p>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput
            placeholder="search the city..."
            onValueChange={(value) => handleSearch(value)}
            className="w-full"
          />

          <CommandList>
            {loading ? (
              <CommandLoading>
                <CommandEmpty>type to search</CommandEmpty>
              </CommandLoading>
            ) : results.length > 0 ? (
              <>
                <CommandGroup key="places" heading="places">
                  {resultsList}
                </CommandGroup>
              </>
            ) : (
              <CommandEmpty>no results found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchAddress;
