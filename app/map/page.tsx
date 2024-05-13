"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import ProfileView from "@/components/ProfileView";
import VenueMap from "@/components/map";
import MapHeader from "@/components/map_header";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { AuthProvider } from "@/context/auth";
import { getUserByUsername } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import useWindowDimensions from "@/utils/window_dimensions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArrowUpRight, Copy } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BSheet from "react-modal-sheet";
import { styled } from "styled-components";

const queryClient = new QueryClient();

const UserSheet = styled(BSheet)`
  .react-modal-sheet-container {
    background-color: #010f16ff !important;
  }

  .react-modal-sheet-backdrop {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }

  .react-modal-sheet-drag-indicator {
    background-color: #666 !important;
  }
`;

function BottomSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const isOpen = username !== null;

  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  useEffect(() => {
    if (username === null) {
      return;
    }
    const fetchUser = async () => {
      const user = await getUserByUsername(username);
      setSelectedUser(user ?? null);
    };
    fetchUser();
  }, [username]);

  const onClose = () => {
    setSelectedUser(null);
    router.push("/map");
  };

  return (
    <UserSheet isOpen={isOpen} onClose={onClose}>
      <BSheet.Container>
        <BSheet.Header />
        <BSheet.Content>
          <BSheet.Scroller>
            {selectedUser === null ? null : (
              <ProfileView username={selectedUser.username} />
            )}
          </BSheet.Scroller>
        </BSheet.Content>
      </BSheet.Container>
      <BSheet.Backdrop />
    </UserSheet>
  );
}

function SideSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const username = searchParams.get("username");
  const isOpen = username !== null;

  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  useEffect(() => {
    if (username === null) {
      return;
    }
    const fetchUser = async () => {
      const user = await getUserByUsername(username);
      setSelectedUser(user ?? null);
    };
    fetchUser();
  }, [username]);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedUser(null);
      router.push("/map");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-scroll">
        <div className="bg-background/10 flex justify-start">
          <Button
            variant="secondary"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/${username}`
              );

              toast({
                description: "link copied!",
              });
            }}
          >
            <div className="flex flex-row justify-center">
              <p>copy link</p>
              <Copy className="ml-2 h-4 w-4" />
            </div>
          </Button>
          <div className="w-2" />
          <Link href={`/${username}`} target="_blank" rel="noreferrer noopener">
            <Button variant="secondary">
              <div className="flex flex-row justify-center">
                <p>open profile</p>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </div>
            </Button>
          </Link>
        </div>
        <div className="flex justify-center">
          {selectedUser === null ? (
            <div className="flex min-h-screen items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="w-full overflow-y-scroll">
              <ProfileHeader user={selectedUser} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Page() {
  const { width } = useWindowDimensions();
  const screenIsSmall = width < 640;

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="flex min-h-screen w-screen items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            {screenIsSmall ? <BottomSheet /> : <SideSheet />}
          </Suspense>
          <div className="absolute z-10">
            <MapHeader />
          </div>
          <div className="z-0">
            <VenueMap />
          </div>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}
