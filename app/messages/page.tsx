"use client";

import { useAuth } from "@/context/auth";
import { getStreamToken } from "@/data/messaging";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ?? "";

const options = { presence: true, state: true };
export default function Page() {
  const { state } = useAuth();
  const pathname = usePathname();
  const currentUser = state?.currentUser ?? null;
  const [token, setToken] = useState<string | null>(null);

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: currentUser?.id ?? "" },
  });

  useEffect(() => {
    const fetchToken = async () => {
      if (!currentUser) return;
      const token = await getStreamToken(currentUser.id);
      setToken(token);
    };
    fetchToken();
  }, [currentUser]);

  if (currentUser === null) {
    const encodedPathname = encodeURIComponent(pathname);
    redirect(`/login?return_url=${encodedPathname}`);
  }
  if (!client) return <div>loading...</div>;

  const filters = { members: { $in: [currentUser.id] }, type: "messaging" };
  return (
    <>
      <Chat client={client}>
        <ChannelList
          sort={{ last_message_at: -1 }}
          filters={filters}
          // options={options}
          showChannelSearch
        />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </>
  );
}
