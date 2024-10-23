import { Menu, UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { trackEvent } from "@/utils/tracking";

export default function MapHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const {
    state: { currentUser },
  } = useAuth();

  return (
    <>
      <div className="dark:supports-backdrop-blur:bg-background/60 dark:bg-background/95 light:supports-backdrop-blur:bg-background/20 light:bg-background/40 flex w-full flex-row justify-between items-center gap-3 px-4 py-2 backdrop-blur">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            trackEvent("menu_click");
            onMenuClick();
          }}
        >
          <Menu className="h-4 w-4" />
        </Button>
        {currentUser === null ? (
          <>
            <Link href={`/signup?return_url=${encodeURIComponent("/dashboard")}`}>
              <Button className="ml-2">sign up</Button>
            </Link>
          </>
        ) : (
          <Avatar className="bg-background ml-2 hover:cursor-pointer hover:shadow-xl">
            {currentUser?.profilePicture !== null && (
              <AvatarImage src={currentUser?.profilePicture} style={{ objectFit: "cover", overflow: "hidden" }} />
            )}
            <AvatarFallback>
              <UserCheck className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </>
  );
}
