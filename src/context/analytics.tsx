"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";

if (typeof window !== "undefined") {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}
export function CSPostHogProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
