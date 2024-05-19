"use client";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebarToggle } from "@/context/use-sidebar-toggle";
import { Footer } from "@/components/admin-panel/footer";
import FullFooter from "@/components/Footer";
import { useStore } from "@/context/use-store";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search";
import useWindowDimensions from "@/utils/window_dimensions";
import { Suspense, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import BottomSheet from "@/components/BottomSheet";
import UserSideSheet from "@/components/UserSideSheet";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OnboardingForm from "@/components/onboarding/OnboardingForm";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { getStreamToken } from "@/data/messaging";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ?? "";
export default function DashboardLayout({
  children,
}: {
    children: React.ReactNode;
  }) {
  const { width } = useWindowDimensions();
  const screenIsSmall = width < 640;
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const { state: authState } = useAuth();
  const currentUserId = authState?.currentUserId;

  const loggedIn = authState?.currentUserId !== undefined && authState?.currentUserId !== null;
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


  if (!loggedIn) {
    return (
      <>
        <main>
          <div className="flex flex-col min-h-screen items-center justify-center">
            <Button>
              <Link href={`/login?return_url=${encodeURIComponent("/dashboard")}`}>
                login
              </Link>
            </Button>
          </div>
        </main>
        <footer>
          <FullFooter />
        </footer>
      </>
    );
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
      <Suspense
        fallback={
          <div className="flex min-h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {screenIsSmall ? <BottomSheet /> : <UserSideSheet />}
      </Suspense>
      <SearchProvider>
        <Chat
          client={client}
        >
          <Sidebar />
          <main
            className={cn(
              "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            {children}
          </main>
          <footer
            className={cn(
              "transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            <Footer />
          </footer>
        </Chat>
      </SearchProvider>
    </>
  );
}
