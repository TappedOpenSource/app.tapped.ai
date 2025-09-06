"use client";

import { SearchProvider } from "@/context/search";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/context/auth";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { getStreamToken } from "@/data/messaging";
import { useTheme } from "next-themes";

import { useHotkeys } from "react-hotkeys-hook";
import { useSearchToggle } from "@/context/use-search-toggle";
import SearchDialog from "@/components/admin-panel/search-dialog";
import TappedSheet from "@/components/TappedSheet";
import { useStore } from "@/context/use-store";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ?? "";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const searchBar = useStore(useSearchToggle, (state) => state);
  const {
    state: { authUser },
  } = useAuth();
  const currentUserId = authUser?.uid;

  const loggedIn = currentUserId !== undefined && currentUserId !== null;
  const [token, setToken] = useState<string | null>(null);
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: currentUserId ?? "" },
  });
  useEffect(() => {
    const fetchToken = async () => {
      if (!currentUserId) return;
      const token = await getStreamToken(currentUserId);
      setToken(token);
    };
    fetchToken();
  }, [currentUserId]);

  useHotkeys("/", (e) => {
    e.preventDefault();
    searchBar?.setIsOpen();
  });

  if (!loggedIn) {
    return (
      <>
        <TappedSheet />
        <SearchProvider>
          <SearchDialog />
          <main className="w-full">{children}</main>
        </SearchProvider>
      </>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <TappedSheet />
      <SearchProvider>
        <Chat client={client} theme={`str-chat__theme-${resolvedTheme === "dark" ? "dark" : "light"}`}>
          <SearchDialog />
          <main className="w-full">{children}</main>
        </Chat>
      </SearchProvider>
    </>
  );
}
