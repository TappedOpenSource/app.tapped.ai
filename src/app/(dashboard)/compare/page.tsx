"use client";

import SearchBar from "@/components/search/SearchBar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { getUserByUsername } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Link from "next/link";

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
      <ContentLayout title="compare">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>compare</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col items-center mt-24">
          <div className="flex flex-row justify-center items-center gap-4">
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
      </ContentLayout>
    </>
  );
}
