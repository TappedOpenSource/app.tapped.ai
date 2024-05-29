"use client";

import { type UserModel } from "@/domain/types/user_model";
import { useState } from "react";

function FeaturedCard({ performer }: { performer: UserModel }) {
  return (
    <>
      <div>{performer.artistName}</div>
    </>
  );
}

export default function FeaturedPerformers() {
  const [performers, setPerformers] = useState<UserModel[]>([]);
  // get the data

  return (
    <>
      {performers.map((performer) => (
        <FeaturedCard key={performer.id} performer={performer} />
      ))}
    </>
  );
}
