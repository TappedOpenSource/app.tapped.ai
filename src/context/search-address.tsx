import { searchPlaces } from "@/data/places";
import { useEffect, useState } from "react";
import { useDebounce } from "./debounce";
import { PlacePrediction } from "@/domain/types/place_data";

export const useSearchAddress = () => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce<string>(query, 250);
  const [results, setResults] = useState<PlacePrediction[]>([]);
  const [selectedItem, setSelectedItem] = useState<PlacePrediction | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      if (debouncedQuery.length > 2) {
        try {
          const response = await searchPlaces(debouncedQuery);
          setResults(response);
          setLoading(false);
        } catch (error) {
          console.error("there was a problem with your fetch operation:", error);
          setResults([]);
        }
      } else {
        setResults([]);
      }
    };
    fetchPlaces();
  }, [debouncedQuery]);

  return {
    query,
    results,
    loading,
    handleSearch,
    selectedItem,
    setSelectedItem,
  };
};
