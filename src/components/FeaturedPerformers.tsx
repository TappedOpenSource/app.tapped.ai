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
      <button
        onClick={() => {
          const newSearchParams = `username=${performer.username}`;
          const newPathname = pathname.includes("?") ? `${pathname}&${newSearchParams}` : `${pathname}?${newSearchParams}`;
          router.push(newPathname);
        }}
      >
        <div
          className="relative bg-card rounded-xl w-24 h-24 md:w-28 md:h-28 transition-all duration-150 ease-in-out hover:scale-105 overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt="performer profile picture"
            className="rounded-xl"
            style={{ objectFit: "cover", overflow: "hidden" }}
            fill
          />
          <h1
            className="absolute bottom-0 left-0 right-0 p-1 md:p-2 text-white font-bold text-md xl:text-xl bg-gradient-to-t from-black to-transparent rounded-b-xl"
          >{performer.artistName}</h1>
        </div>
      </button>
    </>
  );
}

export default function FeaturedPerformers() {
  const [performers, setPerformers] = useState<UserModel[]>([]);
  const [sampledPerformers, setSampledPerformers] = useState<UserModel[]>([]);

  useEffect(() => {
    const getPerformers = async () => {
      const data = await getFeaturedPerformers();
      setPerformers(data);
      const randomPerformers = data.sort(() => 0.5 - Math.random()).slice(0, 15);
      setSampledPerformers(randomPerformers);
    };

    getPerformers();
  }, []);

  useHotkeys("space", () => {
    const newPerformers = performers.sort(() => 0.5 - Math.random()).slice(0, 15);
    setSampledPerformers(newPerformers);
  }, { preventDefault: true });

  return (
    <>
      <div className="my-6 grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-1 overflow-y-scroll">
        {sampledPerformers.map((performer) => (
          <FeaturedCard key={performer.id} performer={performer} />
        ))}
      </div>
    </>
  );
}
