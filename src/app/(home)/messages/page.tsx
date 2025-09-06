"use client";

import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";
import { useTheme } from "next-themes";
import { logout } from "@/data/auth";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  InfiniteScroll,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import Link from "next/link";
import { RequestLoginPage } from "@/components/login/RequireLogin";
import {
  Menu,
  Globe2,
  LayoutDashboard,
  UserCheck,
  Sun,
  Moon,
  MapIcon,
  Download,
  LogOut,
  Gem,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "./messages.css";

export default function Page() {
  const {
    state: { authUser, currentUser },
  } = useAuth();
  const { state: subscribed } = usePurchases();
  const { setTheme } = useTheme();

  if (authUser === null) {
    return <RequestLoginPage />;
  }
  const currentUserId = authUser.uid;

  const filters = { members: { $in: [currentUserId] }, type: "messaging" };
  return (
    <div className="flex h-screen">
      <div className="flex flex-col">
        <div
          className="str-chat str-chat__theme-dark flex flex-row justify-between gap-3 p-1"
          style={{
            backgroundColor: "var(--str-chat__secondary-background-color)",
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-background ml-2 hover:cursor-pointer hover:shadow-xl">
                {currentUser?.profilePicture !== null && (
                  <AvatarImage
                    src={currentUser?.profilePicture}
                    style={{ objectFit: "cover", overflow: "hidden" }}
                  />
                )}
                <AvatarFallback>
                  <UserCheck className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background w-48 rounded-xl border-0 p-2 shadow-xl">
              <DropdownMenuLabel>my account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/map"}>
                <DropdownMenuItem>
                  <MapIcon className="mr-2 h-4 w-4" />
                  <span>map</span>
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard"}>
                <DropdownMenuItem>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>dashboard</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Sun className="mr-2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute mr-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span>toggle theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      system
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Gem className="mr-2 h-4 w-4" />
                {subscribed ? (
                  <span>subscribed</span>
                ) : (
                  <Link href={"/subscribe"}>
                    <span>premium</span>
                  </Link>
                )}
              </DropdownMenuItem>
              <Link href={"/download"}>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>get app</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/map">
            <Button variant={"secondary"}>
              view the map{" "}
              <span className="ml-2">
                <Globe2 className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </div>
        <ChannelList
          sort={{ last_message_at: -1 }}
          filters={filters}
          // options={options}
          Paginator={InfiniteScroll}
          showChannelSearch
        />
      </div>
      <Channel>
        <div className="h-screen w-full">
          <Window>
            <ChannelHeader MenuIcon={Menu} />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </div>
      </Channel>
    </div>
  );
}
