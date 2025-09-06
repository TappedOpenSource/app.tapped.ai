import { getUserByUsername } from "@/data/database";
import { UserModel } from "@/domain/types/user_model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";
import { ArrowUpRight, Copy } from "lucide-react";
import { LoadingSpinner } from "./LoadingSpinner";
import ProfileHeader from "./profile/ProfileHeader";
import Link from "next/link";
import { trackEvent } from "@/utils/tracking";

export default function UserSideSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const username = searchParams.get("username");
  const isOpen = username !== null;

  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [initialSearchParams, setInitialSearchParams] = useState<string | null>(null);

  useEffect(() => {
    // Store initial search params when the sheet opens
    if (!initialSearchParams) {
      setInitialSearchParams(searchParams.toString());
    }
  }, [searchParams, initialSearchParams]);

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
    if (!isOpen && initialSearchParams) {
      setSelectedUser(null);
      const params = new URLSearchParams(initialSearchParams);

      // Remove the username parameter if it exists
      params.delete("username");

      const newQueryString = params.toString() === "" ? "" : `?${params.toString()}`;
      const newUrl = `${pathname}${newQueryString}`;
      router.push(newUrl);
      setInitialSearchParams(null); // Reset for next open
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="overflow-y-scroll">
          <div className="bg-background/10 flex justify-start">
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/u/${username}`);

                trackEvent("user_profile_link_copied", {
                  user_id: selectedUser?.id,
                });

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
            <Link href={`/u/${username}`} target="_blank" rel="noreferrer noopener">
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
                <ProfileHeader user={selectedUser} full />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
