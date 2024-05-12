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
  InfiniteScroll,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "stream-chat-react/dist/css/v2/index.layout.css";
import "./layout.css";

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

  // if (currentUser === null) {
  //   const encodedPathname = encodeURIComponent(pathname);
  //   redirect(`/login?return_url=${encodedPathname}`);
  // }
  if (currentUser === null) return <div>loading...</div>;
  if (!client) return <div>loading...</div>;

  const filters = { members: { $in: [currentUser.id] }, type: "messaging" };
  return (
    <div id="root">
      <Chat client={client}>
        <div className="channel-list-container">
          <ChannelList
            sort={{ last_message_at: -1 }}
            filters={filters}
            // options={options}
            Paginator={InfiniteScroll}
            showChannelSearch
          />
        </div>
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
