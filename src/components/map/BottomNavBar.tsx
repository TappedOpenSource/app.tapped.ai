import { useAuth } from "@/context/auth";
import { useSearchToggle } from "@/context/use-search-toggle";
import { useStore } from "@/context/use-store";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import NumberFlow from "@number-flow/react";
import Link from "next/link";
import {
  Bug,
  Download,
  Gem,
  Home,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  Theater,
  User,
  User2,
} from "lucide-react";
import { logout } from "@/data/auth";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/utils/tracking";
import { useMemo } from "react";

export default function BottomNavBar({
  onVenueCountClick,
  queryLimit,
  cachedMarkers,
  markers,
  isFetching,
}: {
  onVenueCountClick: () => void;
  queryLimit: number;
  cachedMarkers: React.MutableRefObject<JSX.Element[]>;
  markers: JSX.Element[];
  isFetching: boolean;
}) {
  const searchBar = useStore(useSearchToggle, (state) => state);
  const {
    state: { currentUser, authUser },
  } = useAuth();
  const isLoggedIn = authUser !== null;
  const displayName = currentUser?.artistName ?? currentUser?.username ?? "use";
  const email = currentUser?.email ?? authUser?.email ?? "user@tapped.ai";
  const router = useRouter();

  const markersCount = useMemo(() => {
    if (isFetching) {
      return cachedMarkers.current.length;
    }

    return markers.length;
  }, [isFetching, markers, cachedMarkers]);

  return (
    <div className="absolute bottom-0 z-40 flex w-full justify-center">
      <Card className="m-3 flex gap-3 p-1">
        <Button
          variant="outline"
          className={cn("flex gap-1")}
          onClick={() => {
            trackEvent("menu_click");
            onVenueCountClick?.();
          }}
        >
          <span>
            {markersCount === queryLimit && "+"}
            <NumberFlow value={markersCount} />
          </span>
          venues
        </Button>
        <Link href="/venue_outreach" className="hidden lg:block">
          <Button variant="secondary">apply to perform</Button>
        </Link>

        <div className="flex gap-1">
          <Link href="/venue_outreach" className="lg:hidden">
            <Button size="icon" variant="secondary">
              <Theater className="size-3" />
            </Button>
          </Link>
          <Link href="/messages">
            <Button size="icon" variant="secondary">
              <MessageCircle className="size-3" />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => searchBar?.setIsOpen()}
          >
            <Search className="size-3" />
          </Button>
          <Link href="/download" className="lg:hidden">
            <Button size="icon" variant="secondary">
              <Download className="size-3" />
            </Button>
          </Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={currentUser?.profilePicture ?? undefined}
                      alt="Avatar"
                    />
                    <AvatarFallback className="bg-transparent">
                      {currentUser?.username.slice(0, 2) ?? "JD"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {displayName}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link href="/" className="flex items-center">
                      <Home className="text-muted-foreground mr-3 h-4 w-4" />
                      dashboard
                    </Link>
                  </DropdownMenuItem>
                  {currentUser?.username !== undefined && (
                    <>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        asChild
                      >
                        <Link
                          href={`/u/${currentUser?.username ?? ""}`}
                          className="flex items-center"
                        >
                          <User className="text-muted-foreground mr-3 h-4 w-4" />
                          public profile
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link href="/billing" className="flex items-center">
                      <Gem className="text-muted-foreground mr-3 h-4 w-4" />
                      billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link
                      href="https://tapped.canny.io/ideas-bugs"
                      className="flex items-center"
                    >
                      <Bug className="text-muted-foreground mr-3 h-4 w-4" />
                      report bugs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:cursor-pointer" asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="text-muted-foreground mr-3 h-4 w-4" />
                      settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer" asChild>
                  <Link href="/download" className="flex items-center">
                    <Download className="text-muted-foreground mr-3 h-4 w-4" />
                    get the app
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:cursor-pointer"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                >
                  <LogOut className="text-muted-foreground mr-3 h-4 w-4" />
                  sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={`/signup?return_url=${encodeURIComponent("/map")}`}>
              <Button size="icon">
                <User2 className="size-3" />
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}
