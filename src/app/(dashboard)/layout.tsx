"use client";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/context/use-sidebar-toggle";
import FullFooter from "@/components/Footer";
import { useStore } from "@/context/use-store";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useAuth } from "@/context/auth";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { getStreamToken } from "@/data/messaging";
import { useTheme } from "next-themes";

import { useHotkeys } from "react-hotkeys-hook";
import { useSearchToggle } from "@/context/use-search-toggle";
import SearchDialog from "@/components/admin-panel/search-dialog";
import TappedSheet from "@/components/TappedSheet";
import { RequestLoginPage } from "@/components/login/RequireLogin";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ?? "";
export default function DashboardLayout({
  children,
}: {
    children: React.ReactNode;
  }) {
  const { resolvedTheme } = useTheme();
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const searchBar = useStore(useSearchToggle, (state) => state);
  const { state: authState } = useAuth();
  const currentUserId = authState?.authUser?.uid;

  const loggedIn = currentUserId !== undefined && currentUserId !== null;
  const onboarded = authState?.currentUser !== undefined && authState?.currentUser !== null;
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
    return <RequestLoginPage />;
  }

  if (!onboarded) {
    return (
      <>
        <main>
          <OnboardingForm />
        </main>
        <footer>
          <FullFooter />
        </footer>
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
        <Chat
          client={client}
          theme={`str-chat__theme-${resolvedTheme === "dark" ? "dark" : "light"}`}
        >
          <SearchDialog />
          <Sidebar />
          <main
            className={cn(
              "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            {children}
          </main>
          {/* <footer
            className={cn(
              "transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            <Footer />
          </footer> */}
        </Chat>
      </SearchProvider>
    </>
  );
}
