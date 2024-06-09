"use client";

import { useAuth } from "@/context/auth";
import { usePurchases } from "@/context/purchases";
import { logout } from "@/data/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Download,
  Gem,
  LogOut,
  Map,
  LayoutDashboard,
  Home,
  Moon,
  Sun,
  UserCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./ui/button";
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
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import SearchBar from "./SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useScrollPosition } from "@/utils/use_scroll_position";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

function MapHeaderUi({ showSearch = true }: { showSearch?: boolean }) {
  const { state: { currentUser } } = useAuth();
  const { state: subscribed } = usePurchases();
  const { setTheme } = useTheme();
  const scrollPosition = useScrollPosition();
  const router = useRouter();

  return (
    <>
      <div className="flex w-screen flex-row items-center px-4 pb-1 pt-8 md:px-8 supports-backdrop-blur:bg-background/60 w-full bg-background/95 backdrop-blur">
        <div className="hidden md:flex justify-center items-center h-full">
          <Avatar className="bg-background mr-2 hover:cursor-pointer hover:shadow-xl">
            <AvatarImage
              src="/images/icon_1024.png"
              style={{ objectFit: "cover", overflow: "hidden" }}
              onClick={() => router.push("/")}
            />
            <AvatarFallback>
              <Home className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1">
          {showSearch && (
            <div className="md:w-3/4 lg:w-3/4 xl:w-1/2">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center">
                    <LoadingSpinner />
                  </div>
                }>
                <SearchBar />
              </Suspense>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-3">
          <div className="hidden md:block">
            <Link
              href="https://tapped.ai/download"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <Button variant="link">get the app</Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <Select
              onValueChange={(value) => {
                router.push(`/leaderboards?type=${value}`);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="top lists" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>top lists</SelectLabel>
                  <SelectItem value="trending">top trending</SelectItem>
                  <SelectItem value="performer">top performers</SelectItem>
                  {/* <SelectItem value="venue">top venues</SelectItem> */}
                  {/* <SelectItem value="genre">top genres</SelectItem> */}
                  {/* <SelectItem value="city">top cities</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:block">
            <Button
              variant="secondary"
              onClick={() => router.push("/compare")}
            >compare performers</Button>
          </div>
          {currentUser === null ? (
            <>
              <Link href={`/signup?return_url=${encodeURIComponent("/dashboard")}`}>
                <Button className="ml-2">sign up</Button>
              </Link>
            </>
          ) : (
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
                    <Map className="mr-2 h-4 w-4" />
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
                  {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </>
  );
}

export default function MapHeader(props: { showSearch?: boolean }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MapHeaderUi {...props} />
    </QueryClientProvider>
  );
}
