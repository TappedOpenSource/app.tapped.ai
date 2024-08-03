"use client";

import { useAuth } from "@/context/auth";
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
import { RequestLoginPage } from "@/components/login/RequireLogin";
import { Menu } from "lucide-react";
import "stream-chat-react/dist/css/v2/index.css";
// import "stream-chat-react/dist/css/v2/index.layout.css";
import "./messages.css";

export default function Page() {
  const {
    state: { authUser },
  } = useAuth();

  if (authUser === null) {
    return <RequestLoginPage />;
  }
  const currentUserId = authUser.uid;

  const filters = { members: { $in: [currentUserId] }, type: "messaging" };
  return (
    <div className="flex h-screen">
      <ChannelList
        sort={{ last_message_at: -1 }}
        filters={filters}
        // options={options}
        Paginator={InfiniteScroll}
        showChannelSearch
      />
      <Channel
        enrichURLForPreview
      >
        <div className="h-screen">
          <Window>
            <ChannelHeader
              MenuIcon={Menu}
            />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </div>
      </Channel>
    </div>
  );
}
