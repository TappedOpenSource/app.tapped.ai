"use client";

import SearchBar from "@/components/search/SearchBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { getUserByUsername } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { useState, useEffect } from "react";
import UnauthHeader from "@/components/unauth_header";

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
      <UnauthHeader />
      <div className="mt-24 flex flex-col items-center">
        <div className="flex flex-row items-center justify-center gap-4">
          <SearchBar
            openDialog={false}
            onSelect={(user) => {
              setPerformerOne(user);
            }}
          />
          <h3>vs</h3>
          <SearchBar
            openDialog={false}
            onSelect={(user) => {
              setPerformerTwo(user);
            }}
          />
        </div>
        <div className="flex flex-row items-start justify-center gap-4">
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
