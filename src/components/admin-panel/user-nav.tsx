"use client";

import Link from "next/link";
import { Home, MapIcon, LogOut, User, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/data/auth";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export function UserNav() {
  const {
    state: { currentUser },
  } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser?.profilePicture ?? undefined} alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    {currentUser?.username.slice(0, 2) ?? "JD"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {currentUser?.artistName ?? currentUser?.username ?? "John Doe"}
            </p>
            <p className="text-muted-foreground text-xs leading-none">{currentUser?.email ?? "johndoe@email.com"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/" className="flex items-center">
              <Home className="text-muted-foreground mr-3 h-4 w-4" />
              home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/map" className="flex items-center">
              <MapIcon className="text-muted-foreground mr-3 h-4 w-4" />
              map
            </Link>
          </DropdownMenuItem>
          {currentUser?.username !== undefined && (
            <>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href={`/u/${currentUser?.username ?? ""}`} className="flex items-center">
                  <User className="text-muted-foreground mr-3 h-4 w-4" />
                  account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:cursor-pointer" asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="text-muted-foreground mr-3 h-4 w-4" />
                  settings
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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
  );
}
