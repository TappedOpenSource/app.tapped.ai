"use client";

import Image from "next/image";
import { getFeaturedPerformers } from "@/data/database";
import { profileImage, type UserModel } from "@/domain/types/user_model";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Dices } from "lucide-react";
import { Button } from "./ui/button";
import { useHotkeys } from "react-hotkeys-hook";

function FeaturedCard({ performer }: { performer: UserModel }) {
  const router = useRouter();
  const pathname = usePathname();
  const imageSrc = profileImage(performer);

  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => {
          const newSearchParams = `username=${performer.username}`;
          const newPathname = pathname.includes("?") ? `${pathname}&${newSearchParams}` : `${pathname}?${newSearchParams}`;
          router.push(newPathname);
        }}
      >
        <div className="flex flex-row justify-start items-center">
          <div
            className="relative bg-card rounded-xl w-6 h-6"
          >
            <Image
              src={imageSrc}
              alt="performer profile picture"
              className="rounded-xl"
              style={{ objectFit: "cover", overflow: "hidden" }}
              fill
            />
          </div>
          <p
            className="p-1 md:p-2"
          >{performer.artistName ?? performer.username}</p>
        </div>
      </Button>
    </>
  );
}

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

  useHotkeys("space", () => {
    const newPerformers = performers.sort(() => 0.5 - Math.random()).slice(0, 10);
    setSampledPerformers(newPerformers);
  }, { preventDefault: true });

  return (
    <>
      <div className="my-6 flex flex-wrap gap-1">
        {sampledPerformers.map((performer) => (
          <FeaturedCard key={performer.id} performer={performer} />
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
              <div
                className="relative bg-card rounded-xl w-6 h-6"
              >
                <Dices className="h-6 w-6" />
              </div>
              <p
                className="p-1 md:p-2"
              >show more</p>
            </div>
          </Button>
        )}
      </div>
    </>
  );
}
