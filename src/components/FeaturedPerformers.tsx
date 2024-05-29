"use client";

import Image from "next/image";
import { getFeaturedPerformers } from "@/data/database";
import { profileImage, type UserModel } from "@/domain/types/user_model";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
          className="relative bg-card rounded-xl w-24 h-36 md:w-36 md:h-36 xl:w-64 xl:h-64 transition-all duration-150 ease-in-out hover:scale-105 overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt="performer profile picture"
            className="rounded-xl"
            style={{ objectFit: "cover", overflow: "hidden" }}
            fill
          />
          <h1
            className="absolute bottom-0 left-0 right-0 p-1 md:p-2 xl:p-4 text-white font-bold text-md md:text-lg xl:text-xl bg-gradient-to-t from-black to-transparent rounded-b-xl"
          >{performer.artistName}</h1>
        </div>
      </button>
    </>
  );
}

export default function FeaturedPerformers() {
  const [performers, setPerformers] = useState<UserModel[]>([]);

  useEffect(() => {
    const getPerformers = async () => {
      const data = await getFeaturedPerformers();
      setPerformers(data);
    };

    getPerformers();
  }, []);

  return (
    <>
      <div className="my-6 flex flex-row gap-4 w-screen overflow-y-scroll">
        {performers.map((performer) => (
          <FeaturedCard key={performer.id} performer={performer} />
        ))}
      </div>
    </>
  );
}
