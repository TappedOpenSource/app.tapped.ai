"use client";

import {
  User2,
  MapIcon,
  User,
  ArrowUpRight,
  Settings,
  LogOut,
  Home,
  ChevronsUpDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { usePathname, useRouter } from "next/navigation";
import { getMenuList } from "@/lib/menu-list";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/data/auth";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  const {
    state: { authUser, currentUser },
  } = useAuth();
  const isLoggedIn = authUser !== null;
  const displayName = currentUser?.artistName ?? currentUser?.username ?? "use";
  const email = currentUser?.email ?? authUser?.email ?? "user@tapped.ai";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                <Link href="/">
                  <Image
                    src="/images/icon_1024.png"
                    alt="Logo"
                    className="aspect-square rounded-md"
                    width={32}
                    height={32}
                  />
                </Link>
              </span>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-lg font-bold">TappedX</span>
                <span className="text-sm text-gray-500">
                  #1 live music data
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuList.map(({ groupLabel, menus }) => (
          <SidebarGroup key={groupLabel}>
            <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menus.map(
                  ({
                    href,
                    external,
                    label,
                    icon: Icon,
                    requireAuth,
                    submenus,
                  }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        disabled={requireAuth && !isLoggedIn}
                        asChild
                      >
                        <Link
                          href={href}
                          target={external ? "_blank" : undefined}
                          referrerPolicy={external ? "no-referrer" : undefined}
                          className="flex"
                        >
                          <Icon />
                          <span>{label}</span>
                          {external && (
                            <ArrowUpRight size={14} className="ml-auto" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                      {submenus.length > 0 && (
                        <SidebarMenuSub>
                          {submenus.map(({ href, external, label }) => (
                            <SidebarMenuItem key={label}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={href}
                                  target={external ? "_blank" : undefined}
                                  referrerPolicy={
                                    external ? "no-referrer" : undefined
                                  }
                                  className="flex"
                                >
                                  <Icon />
                                  <span>{label}</span>
                                  {external && (
                                    <ArrowUpRight
                                      size={14}
                                      className="ml-auto"
                                    />
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" asChild>
                    <Link
                      href={`/signup?return_url=${encodeURIComponent(
                        "/dashboard"
                      )}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentUser?.profilePicture ?? undefined}
                          alt="Avatar"
                        />
                        <AvatarFallback className="bg-transparent">
                          {currentUser?.username.slice(0, 2) ?? "JD"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="text-md font-bold">{displayName}</span>
                        <span className="text-xs text-gray-500">{email}</span>
                      </div>
                      <ChevronsUpDown className="ml-auto" />
                    </Link>
                  </SidebarMenuButton>
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
                        <DropdownMenuItem
                          className="hover:cursor-pointer"
                          asChild
                        >
                          <Link
                            href={`/u/${currentUser?.username ?? ""}`}
                            className="flex items-center"
                          >
                            <User className="text-muted-foreground mr-3 h-4 w-4" />
                            account
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:cursor-pointer"
                          asChild
                        >
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
            ) : (
              <SidebarMenuButton size="lg" asChild>
                <Link
                  href={`/signup?return_url=${encodeURIComponent(
                    "/dashboard"
                  )}`}
                >
                  <User2 />
                  <span>sign up</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
