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
import "stream-chat-react/dist/css/v2/index.css";
import "stream-chat-react/dist/css/v2/index.layout.css";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { RequestLoginPage } from "@/components/login/RequireLogin";

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
    // <ContentLayout title="messages" noPadding>
    <div className="h-screen">
      <div id="root">
        <div className="h-screen channel-list-container">
          <ChannelList
            sort={{ last_message_at: -1 }}
            filters={filters}
            // options={options}
            Paginator={InfiniteScroll}
            showChannelSearch
          />
        </div>
        <Channel>
          <div className="h-screen">
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </div>
        </Channel>
      </div>
    </div>
    // </ContLayout>
  );
}
