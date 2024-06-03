"use client";

import SearchBar from "@/components/SearchBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { getUserByUsername } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { useState, useEffect } from "react";

const defaultOneUsername = "noah_kahan";
const defaultTwoUsername = "bad_bunny";
export default function Page() {
  const [performerOne, setPerformerOne] = useState<UserModel | null>(null);
  const [performerTwo, setPerformerTwo] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUserOne = async () => {
      const user = await getUserByUsername(defaultOneUsername);
      setPerformerOne(user ?? null);
    };

    const fetchUserTwo = async () => {
      const user = await getUserByUsername(defaultTwoUsername);
      setPerformerTwo(user ?? null);
    };

    fetchUserOne();
    fetchUserTwo();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-24">
        <div className="flex flex-row justify-center items-center gap-4">
          <SearchBar onSelect={
            (user) => {
              setPerformerOne(user);
            }} />
          <h3>vs</h3>
          <SearchBar onSelect={
            (user) => {
              setPerformerTwo(user);
            }} />
        </div>
        <div className="flex flex-row justify-center items-start gap-4">
          <div>
            {performerOne && (
              <div>
                <ProfileHeader user={performerOne} />
              </div>
            )}
          </div>
          <div>
            {performerTwo && (
              <div>
                <ProfileHeader user={performerTwo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
