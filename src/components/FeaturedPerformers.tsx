"use client";

import { getFeaturedPerformers } from "@/data/database";
import { type UserModel } from "@/domain/types/user_model";
import { useState, useEffect } from "react";
import { Dices } from "lucide-react";
import { Button } from "./ui/button";
import { useHotkeys } from "react-hotkeys-hook";
import UserChip from "./UserChip";
import { trackEvent } from "@/utils/tracking";

export default function FeaturedPerformers() {
  const [loading, setLoading] = useState(false);
  const [performers, setPerformers] = useState<UserModel[]>([]);
  const [sampledPerformers, setSampledPerformers] = useState<UserModel[]>([]);

  useEffect(() => {
    const getPerformers = async () => {
      setLoading(true);
      const data = await getFeaturedPerformers();
      setPerformers(data);
      const randomPerformers = data.sort(() => 0.5 - Math.random()).slice(0, 10);
      setSampledPerformers(randomPerformers);
      setLoading(false);
    };

    getPerformers();
  }, []);

  useHotkeys(
    "space",
    () => {
      const newPerformers = performers.sort(() => 0.5 - Math.random()).slice(0, 10);
      setSampledPerformers(newPerformers);
    },
    { preventDefault: true },
  );

  return (
    <>
      <div className="my-6 flex flex-wrap gap-1">
        {sampledPerformers.map((performer) => (
          <UserChip
            key={performer.id}
            user={performer}
            onClick={() => {
              trackEvent("featured_performer_click", { performer_id: performer.id });
            }}
          />
        ))}
        {!loading && (
          <Button
            variant={"outline"}
            onClick={() => {
              const newPerformers = performers.sort(() => 0.5 - Math.random()).slice(0, 10);
              setSampledPerformers(newPerformers);
            }}
          >
            <div className="flex flex-row justify-start items-center">
              <div className="relative bg-card rounded-xl w-6 h-6">
                <Dices className="h-6 w-6" />
              </div>
              <p className="p-1 md:p-2">show more</p>
            </div>
          </Button>
        )}
      </div>
    </>
  );
}
